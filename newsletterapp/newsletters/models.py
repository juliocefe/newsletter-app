# django
from django.conf import settings
from django.db import models
from django.core.validators import FileExtensionValidator
# newsletterapp
from newsletterapp.utils.models import MyBaseModel


class Topic(MyBaseModel):
    """ Topic model.
    
    This class represent a topic wich can be
    asigned to a newsletter obj.
    The motivation to introduce the topics feature came from the bonus point:
        "Recipient user can opt for only unsubscribe from specific newsletters"
    examples: 
        cook
        cars
        videogames
    """
    name = models.CharField(max_length=50, unique=True)


class Recipient(MyBaseModel):
    """Recipient model
    
    This class represent a user that will
    receive our newsletters.
    fields:
        email: The user email
        subscribed: If value is False, means the user 
        chose to unsubscribe from any newsletter.
    """
    email = models.EmailField()
    subscribed = models.BooleanField(default=True)
    topics = models.ManyToManyField(Topic, through="TopicSusbscription")


class TopicSusbscription(MyBaseModel):
    """The intermediate model between Topic and Recipient.
    
    This model represent the many to many relationship
    between Topic and Recipient models.
    fields:
        topic: The topic which the recipient is sucribed.
        recipient: The recipient suscribed to the topic.
        subscribed: If value is False, means the user 
        chose to unsubscribe from the related topic.
    """
    topic = models.ForeignKey(
        to=Topic,
        on_delete=models.PROTECT,
    )
    recipient = models.ForeignKey(
        to=Recipient,
        on_delete=models.PROTECT,
    )
    subscribed = models.BooleanField(default=True)


class NewsLetter(MyBaseModel):
    """TODO"""
    file = models.FileField(
        upload_to="newsletterapp/newsletters/media/newsletters", 
        validators=[FileExtensionValidator(['pdf', 'jpg', 'jpeg', 'png'])]
    )
    topic = models.ForeignKey(
        to=Topic,
        on_delete=models.CASCADE,
    )


class NewsLetterItem(MyBaseModel):
    """NewsLetterItem model.
    
    This class represent a recipient that will receive
    the newsletter.
    """
    newsletter = models.ForeignKey(
        to=NewsLetter,
        on_delete=models.PROTECT
    )
    recipient = models.ForeignKey(
        to=Recipient,
        on_delete=models.PROTECT
    )
    created_by = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT
    )

