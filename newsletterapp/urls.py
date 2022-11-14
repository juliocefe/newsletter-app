from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
# rest framework
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.routers import DefaultRouter


router = DefaultRouter()

apiurls = [
    path('', include('newsletterapp.newsletters.urls')),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    # rest framework
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("api-token-auth/", ObtainAuthToken.as_view(), name="api-token-auth"),
    path("api/", include((apiurls, "api"))),
]

if settings.DEBUG:
    # Static file serving when using Gunicorn + Uvicorn for local web socket development
    urlpatterns += staticfiles_urlpatterns()
