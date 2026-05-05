from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProductViewSet, IndustryViewSet, ServiceViewSet,
    ContactRequestViewSet, TestimonialViewSet
)

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'industries', IndustryViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'contact-requests', ContactRequestViewSet)
router.register(r'testimonials', TestimonialViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
