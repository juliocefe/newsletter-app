# rest framework
from rest_framework import serializers
# utils
from newsletterapp.utils.serializers import inline_serializer


class NewsLetterCreateSerializer(serializers.Serializer):
    title = serializers.CharField()
    file = serializers.FileField()
    topic = serializers.IntegerField()
    scheduled_at = serializers.DateTimeField(format="%d/%m/%Y %H:%M:%S")
    items = inline_serializer(
        fields={
            "id": serializers.IntegerField(),
            "email": serializers.EmailField()
        },
        min_length=1,
        many=True
    )


class NewsLetterListSerializer(serializers.Serializer):
    id = serializers.CharField()
    title = serializers.CharField()
    topic = serializers.StringRelatedField()
    status = serializers.CharField(source="get_status_display")
    items = inline_serializer(
        fields={
            "id": serializers.IntegerField(),
            "recipient": serializers.StringRelatedField()
        },
        many=True
    )