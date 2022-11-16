# python
from __future__ import annotations
from typing import BinaryIO
from datetime import datetime
import uuid
# django
from django.db import transaction
from django.utils import timezone
# models
from newsletterapp.newsletters.models import NewsLetter, NewsLetterItem
from newsletterapp.newsletters.models import TopicSusbscription
from newsletterapp.newsletters.models import Recipient
from newsletterapp.newsletters.models import Topic
from newsletterapp.users.models import User
# utils
from newsletterapp.utils.serializers import get_object
# tasks
from newsletterapp.newsletters.tasks import send_emails


@transaction.atomic
def newsletter_create(
    request,
    file: BinaryIO,
    title: str,
    topic: int,
    user: User,
    scheduled_at: datetime,
    items: list[dict],
):
    """Store the news letter in the database."""
    topic_instance = get_object(Topic, pk=topic)
    obj = NewsLetter(
        file=file,
        title=title,
        created_by=user,
        scheduled_at=scheduled_at,
        topic=topic_instance
    )
    obj.full_clean()
    obj.save()
    recipients_list = newsletter_items_create(obj, user, topic_instance, items)
    subscribe_recpients_to_topic(recipients_list, topic_instance)
    send_emails(request, recipients_list, topic_instance)
    # send_emails.apply_async((items,), eta=obj.scheduled_at or timezone.now())
    return obj


def newsletter_items_create(
    newsletter: NewsLetter,
    user: User,
    topic: Topic,
    items: list[dict],
):
    """Store recipients of the newsletter in the database."""
    recipients_list = []
    for item in items:
        recipient = get_object(Recipient, pk=item["id"])
        # omit the recipient if it is unsubscribed from all
        if recipient.unsubscribe_link is None: continue
        # 
        subscription = TopicSusbscription.objects.filter(
            topic=topic,
            recipient=recipient
        ).first()
        # omit the recipient if it is unsubscribed from the topic
        if (
            subscription is not None 
            and subscription.unsubscribe_link is None
        ): continue

        obj = NewsLetterItem(
            newsletter=newsletter,
            created_by=user,
            recipient=recipient
        )
        obj.full_clean()
        obj.save()
        recipients_list.append(obj)
    return recipients_list



# SUBSCRIPTIONS
def subscribe_recpients_to_topic(recipients: list[NewsLetterItem], topic: Topic):
    for recipient in recipients:
        TopicSusbscription.objects.get_or_create(
            topic=topic,
            recipient=recipient.recipient
        )

