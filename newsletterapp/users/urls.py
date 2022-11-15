# django
from django.urls import path, include
# views
from .views import CustomAuthToken

apiurls = [
    path("token-auth/", CustomAuthToken.as_view(), name="api-token-auth"),
]

urlpatterns = [
    path("api/", include(apiurls)),
]