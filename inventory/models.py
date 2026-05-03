from django.db import models, transaction
from django.core.exceptions import ValidationError


# -------------------- SUPPLIER --------------------

class Supplier(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# -------------------- PRODUCT --------------------

class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    quantity = models.PositiveIntegerField(default=0)   # Prevent negative stock
    price = models.DecimalField(max_digits=10, decimal_places=2)

    supplier = models.ForeignKey(
        Supplier,
        on_delete=models.PROTECT,     # Professional approach
        related_name="products"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# -------------------- ORDER --------------------

class Order(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="orders"
    )

    quantity = models.PositiveIntegerField()   # Prevent negative order
    total_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True
    )

    order_date = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):

        # Only when creating new order
        if self.pk is None:

            with transaction.atomic():
                product = Product.objects.select_for_update().get(pk=self.product.pk)

                # ✅ Validate stock
                if product.quantity < self.quantity:
                    raise ValidationError("Not enough stock available!")

                # ✅ Reduce stock
                product.quantity -= self.quantity
                product.save()

                # ✅ Auto calculate total price
                self.total_price = product.price * self.quantity

                super().save(*args, **kwargs)

        else:
            super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):

        with transaction.atomic():
            product = self.product

            # Restore stock when order deleted
            product.quantity += self.quantity
            product.save()

            super().delete(*args, **kwargs)

    def __str__(self):
        return f"Order - {self.product.name}"


# -------------------- INVOICE --------------------

class Invoice(models.Model):

    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE,
        related_name="invoices"
    )

    invoice_number = models.CharField(
        max_length=50,
        unique=True
    )

    customer_name = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    total_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    invoice_date = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Auto set total from order
        if not self.total_amount:
            self.total_amount = self.order.total_price
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Invoice {self.invoice_number}"