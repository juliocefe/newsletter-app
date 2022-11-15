# rest framework
from rest_framework import serializers
# utils
from newsletterapp.utils.serializers import inline_serializer


class NewsLetterCreateSerializer(serializers.Serializer):
    title = serializers.CharField()
    file = serializers.FileField()
    topic = serializers.IntegerField()
    items = inline_serializer(
        fields={
            "id": serializers.IntegerField(),
            "email": serializers.EmailField()
        },
        many=True
    )


class NewsLetterListSerializer(serializers.Serializer):
    id = serializers.CharField()
    title = serializers.CharField()
    topic = serializers.StringRelatedField()
    items = inline_serializer(
        fields={
            "id": serializers.IntegerField(),
            "recipient": serializers.StringRelatedField()
        },
        many=True
    )