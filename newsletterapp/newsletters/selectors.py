from newsletterapp.newsletters.models import Topic
from newsletterapp.newsletters.models import Recipient
from newsletterapp.newsletters.models import NewsLetter
from django.db.models import QuerySet


def get_topics() -> QuerySet:
    """Retrieve all the topics"""
    return Topic.objects.all()


def get_recipients() -> QuerySet:
    """Retrieve all the suscribed recipients"""
    return Recipient.objects.filter(subscribed=True)


def get_news_letters() -> QuerySet:
    """Retrive the list of newsletters """
    return NewsLetter.objects.all()