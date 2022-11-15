from django.urls import path, include
from newsletterapp.newsletters import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r"newsletters", views.NewsLetterApi,  basename="newsletters")

apiurls = [
    path("api/", include(router.urls)),
    path("api/topics/", views.TopicsListApi.as_view(), name="topics"),
    path("api/recipients/", views.RecipientsListApi.as_view(), name="recipients"),
]

urlpatterns = apiurls