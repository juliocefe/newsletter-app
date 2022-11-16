# django
from django.conf import settings
from django.core.mail import send_mass_mail
from django.core import mail
from django.shortcuts import render
from django.template.loader import render_to_string
from celery import shared_task
# models
from newsletterapp.newsletters.models import TopicSusbscription


SENDER_EMAIL = "username@mailserver.domain"

# @shared_task
def send_emails(request, recipients_list, topic):
    host = request.get_host()
    for recipient in recipients_list:
        topic_subscription =  TopicSusbscription.objects.get(
            recipient=recipient.recipient,
            topic=topic
        )
        context = {
            "email": recipient.recipient.email,
            "absolute_url": host,
            "unsubscribe_topic_link": topic_subscription.unsubscribe_link,
            "unsubscribe_all_link": recipient.recipient.unsubscribe_link,
        }
        with mail.get_connection() as connection:
            html_content = render_to_string("email.html", context)
            email = mail.EmailMessage(
                "subject here", 
                html_content, 
                SENDER_EMAIL,
                [recipient.recipient.email],
                connection=connection,
            )
            email.content_subtype = "html"
            email.send()
    # messages = tuple([
    #     ("subject here", message, SENDER_EMAIL, [item["email"]])
    #     for item in items
    # ])
    # send_mass_mail(messages, fail_silently=False)