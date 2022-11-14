# django
from django.shortcuts import get_object_or_404
from django.http import Http404
# rest framework
from rest_framework import serializers


# NESTED SERIALIZERS
# https://github.com/HackSoftware/Django-Styleguide#nested-serializers
def create_serializer_class(name, fields):
    return type(name, (serializers.Serializer,), fields)


def inline_serializer(*, fields, data=None, **kwargs):
    serializer_class = create_serializer_class(name="", fields=fields)

    if data is not None:
        return serializer_class(data=data, **kwargs)

    return serializer_class(**kwargs)

# FETCHING OBJECTS
# https://github.com/HackSoftware/Django-Styleguide#fetching-objects
def get_object(model_or_queryset, **kwargs):
    """
    Reuse get_object_or_404 since the implementation supports both Model && queryset.
    Catch Http404 & return None
    """
    try:
        return get_object_or_404(model_or_queryset, **kwargs)
    except Http404:
        return None