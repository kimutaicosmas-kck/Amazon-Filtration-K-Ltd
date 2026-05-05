from django.db import models
from django.utils import timezone


class Product(models.Model):
    CATEGORY_CHOICES = [
        ('Oil', 'Oil Filter'),
        ('Fuel', 'Fuel Filter'),
        ('Air', 'Air Filter'),
        ('Hydraulic', 'Hydraulic Filter'),
        ('Coolant', 'Coolant Filter'),
        ('Cabin', 'Cabin Filter'),
    ]
    
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    description = models.TextField()
    image_url = models.URLField(max_length=500, blank=True, null=True)
    datasheet_url = models.URLField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name


class Industry(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    image_url = models.URLField(max_length=500, blank=True, null=True)
    
    def __str__(self):
        return self.name


class Service(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    image_url = models.URLField(max_length=500, blank=True, null=True)
    
    def __str__(self):
        return self.title


class ContactRequest(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True, null=True)
    message = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.email}"


class Testimonial(models.Model):
    name = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    content = models.TextField()
    rating = models.IntegerField(default=5)
    created_at = models.DateTimeField(default=timezone.now)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} from {self.company}"
