# django
from django.core import mail
from django.template.loader import render_to_string
from celery import shared_task
# pillow
from PIL import Image
# models
from newsletterapp.newsletters.models import TopicSusbscription
from newsletterapp.newsletters.models import NewsLetter
from newsletterapp.newsletters.models import NewsLetterItem
from newsletterapp.newsletters.models import Topic
# utils
from newsletterapp.utils.serializers import get_object


SENDER_EMAIL = "username@mailserver.domain"
PDF_PATH = "newsletterapp/media/newsletters/newsletter.pdf"


@shared_task
def send_emails(
    host: str, 
    newsletter_id: int, 
    recipientids_list: list[int], 
    topic_id: int
):
    newsletter: NewsLetter = get_object(NewsLetter, pk=newsletter_id)
    # update status to sending
    newsletter.status = NewsLetter.Status.SENDING
    newsletter.save()
    topic: Topic = get_object(Topic, pk=topic_id)
    recipientids_list = NewsLetterItem.objects.filter(pk__in=recipientids_list)
    img, pdf_path = get_files_info(newsletter.file)
    for recipient in recipientids_list:
        topic_subscription =  TopicSusbscription.objects.get(
            recipient=recipient.recipient,
            topic=topic
        )
        context = {
            "image": img,
            "newsletter": newsletter,
            "email": recipient.recipient.email,
            "absolute_url": host,
            "unsubscribe_topic_link": topic_subscription.unsubscribe_link,
            "unsubscribe_all_link": recipient.recipient.unsubscribe_link,
        }
        with mail.get_connection() as connection:
            html_content = render_to_string("email.html", context)
            email = mail.EmailMessage(
                topic.name, 
                html_content, 
                SENDER_EMAIL,
                [recipient.recipient.email],
                connection=connection,
            )
            email.content_subtype = "html"
            email.attach_file(pdf_path)
            email.send()
        # update newsletter status to sent
        newsletter.status = NewsLetter.Status.SENT
        newsletter.save()


def get_files_info(initial_file):
    """Retrieve an img file and the pdf path.
    
    If file is an img then generate the pdf with it.
    if the initial file is pdf the returned img will be None.
    """
    img = None
    pdf_path = f"newsletterapp/media/{initial_file.name}"
    if initial_file.name.split(".")[-1] != "pdf":
        img = initial_file
        convert_img_to_pdf(initial_file)
        pdf_path = PDF_PATH
    return img, pdf_path
    

def convert_img_to_pdf(img):
    """Create a pdf from a given img"""
    img = Image.open(img)
    img = img.convert('RGB')
    img.save(PDF_PATH)