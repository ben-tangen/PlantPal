from django.contrib import admin
from django.urls import path, include
from core import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("registration/", include("django.contrib.auth.urls")),  # Assuming you have auth URLs
    path("", views.index, name="index"),
    path("photo-journal", views.index, name="photo-journal"),  # Add this line
]