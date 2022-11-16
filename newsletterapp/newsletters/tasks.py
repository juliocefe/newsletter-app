from celery import shared_task
from django.core.mail import send_mass_mail

SENDER_EMAIL = "username@mailserver.domain"

@shared_task
def send_emails(items):
    message = 'Here is the message'
    messages = tuple([
        ("subject here", message, SENDER_EMAIL, [item["email"]])
        for item in items
    ])
    send_mass_mail(messages, fail_silently=False)