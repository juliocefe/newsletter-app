from django.contrib import admin
from newsletterapp.newsletters.models import Topic
from newsletterapp.newsletters.models import Recipient
from newsletterapp.newsletters.models import TopicSusbscription
from newsletterapp.newsletters.models import NewsLetter, NewsLetterItem


@admin.register(TopicSusbscription)
class TopicSusbscriptionAdmin(admin.ModelAdmin):
    pass


@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    pass


@admin.register(Recipient)
class RecipientAdmin(admin.ModelAdmin):
    pass


class NewsLetterItemInlineAdmin(admin.TabularInline):
    model = NewsLetterItem


@admin.register(NewsLetter)
class NewsLetterAdmin(admin.ModelAdmin):
    inlines = (NewsLetterItemInlineAdmin,)