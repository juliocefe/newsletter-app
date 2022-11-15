# python
import json
# rest framework
from rest_framework import viewsets, views
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status
# serializers
from newsletterapp.newsletters.serializers import NewsLetterCreateSerializer
from newsletterapp.newsletters.serializers import NewsLetterListSerializer
# services
from newsletterapp.newsletters.services import newsletter_create
# selectors
from newsletterapp.newsletters.selectors import get_topics, get_recipients, get_news_letters

class NewsLetterApi(viewsets.ViewSet):

    def create(self, request):
        request_data: dict = request.data.dict()
        serializer = NewsLetterCreateSerializer(data={
            **request_data,
            "items": json.loads(request_data["items"])
        })
        serializer.is_valid(raise_exception=True)
        newsletter_create(
            user=request.user,
            **serializer.validated_data
        )
        return Response(status=status.HTTP_201_CREATED)

    def list(self, request):
        queryset = get_news_letters()
        data = NewsLetterListSerializer(queryset, many=True).data
        return Response({
            "newsletters": data
        }, status=status.HTTP_200_OK)

    def update(self, request, newsletter_id):
        raise NotImplementedError()


class TopicsListApi(views.APIView):

    class OutputSerializer(serializers.Serializer):
        id = serializers.IntegerField()
        name = serializers.CharField()
    
    def get(self, request):
        queryset = get_topics()
        data = self.OutputSerializer(queryset, many=True).data
        return Response({"topics": data},  status=status.HTTP_200_OK)


class RecipientsListApi(views.APIView):

    class OutputSerializer(serializers.Serializer):
        id = serializers.IntegerField()
        email = serializers.CharField()
    
    def get(self, request):
        queryset = get_recipients()
        data = self.OutputSerializer(queryset, many=True).data
        return Response({"recipients": data},  status=status.HTTP_200_OK)
