# python
from __future__ import annotations
from typing import BinaryIO
# django
from django.db import transaction
# models
from newsletterapp.newsletters.models import NewsLetter, NewsLetterItem
from newsletterapp.newsletters.models import Recipient
from newsletterapp.newsletters.models import Topic
from newsletterapp.users.models import User
# utils
from newsletterapp.utils.serializers import get_object


@transaction.atomic
def newsletter_create(
    file: BinaryIO,
    title: str,
    topic: int,
    user: User,
    items: list[dict]
):
    """Store the news letter in the database."""
    obj = NewsLetter(
        file=file,
        title=title,
        created_by=user,
        topic=get_object(Topic, pk=topic)
    )
    obj.full_clean()
    obj.save()
    newsletter_items_create(obj, user, items)
    return obj


def newsletter_items_create(
    newsletter: NewsLetter,
    user: User,
    items: list[dict]
):
    """Store recipients of the newsletter in the database."""
    for item in items:
        obj = NewsLetterItem(
            newsletter=newsletter,
            created_by=user,
            recipient=get_object(Recipient, pk=item["recipient"])
        )
        obj.full_clean()
        obj.save()
