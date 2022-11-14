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
            "recipient": serializers.IntegerField()
        },
        many=True
    )