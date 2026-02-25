from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, SupplierViewSet, OrderViewSet, InvoiceViewSet

router = DefaultRouter()

router.register(r'products', ProductViewSet)
router.register(r'suppliers', SupplierViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'invoices', InvoiceViewSet)

urlpatterns = router.urls
