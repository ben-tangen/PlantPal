from django.shortcuts import render
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from core.models import Plant, CareLog, PhotoJournal
import json
import os

# Load manifest when server launches
MANIFEST = {}
if not settings.DEBUG:
    f = open(f"{settings.BASE_DIR}/core/static/manifest.json")
    MANIFEST = json.load(f)

# Create your views here.
@login_required
def index(req):
    context = {
        "asset_url": os.environ.get("ASSET_URL", ""),
        "debug": settings.DEBUG,
        "manifest": MANIFEST,
        "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
        "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0]
    }
    return render(req, "core/index.html", context)

@csrf_exempt
@login_required
def add_plant(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            plant = Plant.objects.create(
                user=request.user,
                name=data.get("name"),
                species=data.get("species"),
                watering_frequency=data.get("watering_frequency"),
                light_needs=data.get("light_needs"),
            )
            return JsonResponse({"message": "Plant added successfully!", "plant_id": plant.id}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
@login_required
def add_care_log(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            plant_id = data.get("plant_id")
            activity = data.get("activity")

            # Ensure the plant belongs to the logged-in user
            plant = Plant.objects.get(id=plant_id, user=request.user)

            # Create a new care log entry
            care_log = CareLog.objects.create(
                plant=plant,
                activity=activity,
            )
            return JsonResponse({"message": "Care log added successfully!", "care_log_id": care_log.id}, status=201)
        except Plant.DoesNotExist:
            return JsonResponse({"error": "Plant not found or does not belong to the user."}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
@login_required
def add_photo(request):
    if request.method == "POST" and request.FILES.get("image"):
        try:
            plant_id = request.POST.get("plant_id")
            image = request.FILES["image"]

            # Ensure the plant belongs to the logged-in user
            plant = Plant.objects.get(id=plant_id, user=request.user)

            # Create a new photo journal entry
            photo = PhotoJournal.objects.create(
                plant=plant,
                image=image,
            )
            return JsonResponse({"message": "Photo added successfully!", "photo_id": photo.id}, status=201)
        except Plant.DoesNotExist:
            return JsonResponse({"error": "Plant not found or does not belong to the user."}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method or no image provided"}, status=405)