from django.db import models
from django.contrib.auth.models import User

class Plant(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    species = models.CharField(max_length=100)
    watering_frequency = models.IntegerField()  # in days
    light_needs = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

class CareLog(models.Model):
    plant = models.ForeignKey(Plant, on_delete=models.CASCADE, related_name="care_logs")
    activity = models.CharField(max_length=100)  # e.g., "Watered", "Fertilized"
    date = models.DateTimeField(auto_now_add=True)

class PhotoJournal(models.Model):
    plant = models.ForeignKey(Plant, on_delete=models.CASCADE, related_name="photos")
    image = models.ImageField(upload_to="plant_photos/")
    uploaded_at = models.DateTimeField(auto_now_add=True)