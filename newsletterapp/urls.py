from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
# rest framework
from rest_framework.routers import DefaultRouter
# 
from newsletterapp.newsletters.views import SpaView


router = DefaultRouter()

urlpatterns = [
    path("admin/", admin.site.urls),
    # rest framework
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    # local
    path("", include('newsletterapp.newsletters.urls')),
    path("", include("newsletterapp.users.urls")),
    re_path(r'^spa/.*?$', SpaView.as_view(), name="spa"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    # Static file serving when using Gunicorn + Uvicorn for local web socket development
    urlpatterns += staticfiles_urlpatterns()
