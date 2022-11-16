# python
import uuid
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

    def __str__(self):
        return self.name


class Recipient(MyBaseModel):
    """Recipient model
    
    This class represent a user that will
    receive our newsletters.
    fields:
        email: The user email
        subscribed: If value is False, means the user 
        chose to unsubscribe from any newsletter.
    """
    email = models.EmailField(unique=True)
    # TODO maybe remove this field and use unsubscribe_link field is not None
    subscribed = models.BooleanField(default=True)
    unsubscribe_link = models.UUIDField(default=uuid.uuid4, null=True, editable=False)
    topics = models.ManyToManyField(Topic, through="TopicSusbscription")
    
    def __str__(self):
        return self.email


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
    # TODO maybe remove this field and use unsubscribe_link field is not None
    subscribed = models.BooleanField(default=True)
    unsubscribe_link = models.UUIDField(default=uuid.uuid4, null=True, editable=False)


class NewsLetter(MyBaseModel):
    """Newsletter model.
    
    Represent a newsletter.
    fields:
        title: The title of the newsletter
        file: A file that will be atached to the newsletter email,
            it can be a pdf or an image.
        topic: The the newsletter topic.
        created_by: The user that created the newsletter.
    """
    class Status(models.TextChoices):
        READY = "READY", "Ready"
        SENDING = "SENDING", "Sending"
        SENT = "SENT", "Sent"
        FAILED = "FAILED", "Failed"

    title = models.CharField(max_length=50)
    file = models.FileField(
        upload_to="newsletters/", 
        validators=[FileExtensionValidator(['pdf', 'jpg', 'jpeg', 'png'])]
    )
    topic = models.ForeignKey(
        to=Topic,
        on_delete=models.CASCADE,
    )
    status = models.CharField(max_length=255, choices=Status.choices, default=Status.READY)
    scheduled_at = models.DateTimeField(null=True, blank=True)
    created_by = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT
    )


class NewsLetterItem(MyBaseModel):
    """NewsLetterItem model.
    
    This class represent a recipient that will receive
    the newsletter.
    """
    newsletter = models.ForeignKey(
        to=NewsLetter,
        on_delete=models.PROTECT,
        related_name="items"
    )
    recipient = models.ForeignKey(
        to=Recipient,
        on_delete=models.PROTECT
    )
    created_by = models.ForeignKey(
        to=settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT
    )

