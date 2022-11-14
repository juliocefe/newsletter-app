from rest_framework import viewsets
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status
# serializers
from newsletterapp.newsletters.serializers import NewsLetterCreateSerializer
# services
from newsletterapp.newsletters.services import newsletter_create


class NewsLetterApi(viewsets.ViewSet):

    def create(self, request):
        serializer = NewsLetterCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        newsletter_create(
            user=request.user,
            **serializer.validated_data
        )
        return Response(status=status.HTTP_201_CREATED)

    def update(self, request, newsletter_id):
        raise NotImplementedError()


