from newsletterapp.newsletters.models import Topic
from newsletterapp.newsletters.models import Recipient


def getTopics():
    """Retrieve all the topics"""
    return Topic.objects.all()


def getRecipients():
    """Retrieve all the suscribed recipients"""
    return Recipient.objects.filter(subscribed=True)