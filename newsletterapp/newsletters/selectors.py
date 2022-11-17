# python
from dateutil.relativedelta import relativedelta
from datetime import date
from collections import OrderedDict
# django
from django.db.models import QuerySet
from django.db.models import Count, F
from django.db.models import Value
from django.db.models.functions import TruncDay, Coalesce
from django.utils import timezone
from newsletterapp.newsletters.models import Topic
from newsletterapp.newsletters.models import Recipient
from newsletterapp.newsletters.models import NewsLetter
from newsletterapp.newsletters.models import TopicSusbscription


def get_topics() -> QuerySet:
    """Retrieve all the topics"""
    return Topic.objects.all()


def get_recipients() -> QuerySet:
    """Retrieve all the suscribed recipients"""
    return Recipient.objects.filter(subscribed=True)


def get_news_letters() -> QuerySet:
    """Retrive the last ten newsletters"""
    return NewsLetter.objects.all()[:10]


def get_last_7_day_dates(six_days_ago: date) -> OrderedDict[date:int]:
    """Retrieve a ordered dict of 7 elements.

        Every elements looks like date:index
        example:
        {
            datetime.datetime(2022, 11, 16): 0,
            datetime.datetime(2022, 11, 17): 0,
            datetime.datetime(2022, 11, 18): 0,
            ....
         }
    """
    days = OrderedDict()
    cur_date = six_days_ago
    end_date = timezone.now().date()
    index = 0
    while cur_date <= end_date:
        day_date = cur_date
        days[day_date] = index
        cur_date += relativedelta(days=1)
        index += 1 
    return days

def get_news_letters_by_day():
    """Retrieve a number of news letters from last seven days"""
    six_days_ago = timezone.now() - relativedelta(days=6)
    days: OrderedDict[date, int] = get_last_7_day_dates(six_days_ago)
    queryset = NewsLetter.objects.filter(
            created_at__gte=six_days_ago,
        ).annotate(
            day=TruncDay("created_at__date"),
        ).values("day", topic_name=F("topic__name")).annotate(
            total=Coalesce(Count("created_at__date"), 0)
        ).values(
            "day",
            "topic_name",
            "total",
        ).order_by("day")
    # Don't punish me for this please,
    # I know there is a better way, but I don't have time now.
    # Generate dataset for some chart in the front
    datasets = {}
    for i in queryset:
        topic = i["topic_name"]
        if topic not in datasets:
            datasets[topic] = {
                "label": topic,
                "data": [0] * len(days)
            }
        topic: dict = datasets[topic]
        day_index = days[i["day"]]
        topic["data"][day_index] += i["total"]
    return {
        "labels": [date.strftime("%A") for date in days.keys()],
        "datasets": datasets
    }

def get_subscriptions_by_topic():
    """Retrive subscriptions number by topic"""
    return TopicSusbscription.objects.values(
        name=F("topic__name")
    ).annotate(total=Count("name"))