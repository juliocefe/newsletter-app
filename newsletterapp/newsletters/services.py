# python
from __future__ import annotations
from typing import BinaryIO
from datetime import datetime
# django
from django.db import transaction
from django.utils import timezone
# models
from newsletterapp.newsletters.models import NewsLetter, NewsLetterItem
from newsletterapp.newsletters.models import Recipient
from newsletterapp.newsletters.models import Topic
from newsletterapp.users.models import User
# utils
from newsletterapp.utils.serializers import get_object
# tasks
from newsletterapp.newsletters.tasks import send_emails


@transaction.atomic
def newsletter_create(
    file: BinaryIO,
    title: str,
    topic: int,
    user: User,
    scheduled_at: datetime,
    items: list[dict]
):
    """Store the news letter in the database."""
    obj = NewsLetter(
        file=file,
        title=title,
        created_by=user,
        scheduled_at=scheduled_at,
        topic=get_object(Topic, pk=topic)
    )
    obj.full_clean()
    obj.save()
    newsletter_items_create(obj, user, items)
    send_emails.apply_async((items,), eta=obj.scheduled_at or timezone.now())
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
            recipient=get_object(Recipient, pk=item["id"])
        )
        obj.full_clean()
        obj.save()
