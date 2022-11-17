from django.urls import path, include
from newsletterapp.newsletters import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r"newsletters", views.NewsLetterApi,  basename="newsletters")

subscription = [
    path(
        "subscriptions/unsubscribe_all/<uuid:suscription_id>/",
        views.unsubscribe_from_all_api,
        name="unsubscribe_all"),
    path(
        "subscriptions/unsubscribe_topic/<uuid:suscription_id>/",
        views.unsubscribe_from_topic_api,
        name="unsubscribe_topic"
    ),
]

apiurls = [
    path("hola", views.hola, name="hola"),
    path("api/", include(router.urls)),
    path("api/topics/", views.TopicsListApi.as_view(), name="topics"),
    path("api/recipients/", views.RecipientsListApi.as_view(), name="recipients"),
    path("api/newsletters_by_day/", views.NewsLettersByDayList.as_view(), name="news_letters_by_day"),
    path("api/subscriptions_by_topic/", views.SubscriptionsByTopic.as_view(), name="subscriptions_by_topic")
]

urlpatterns = apiurls + subscription