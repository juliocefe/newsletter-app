from django.urls import path, include
from newsletterapp.newsletters import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r"newsletters", views.NewsLetterApi,  basename="newsletters")

urlpatterns = router.urls