# Register your models here.
from django.contrib import admin
from .models import Product, Supplier

admin.site.register(Product)
admin.site.register(Supplier)
