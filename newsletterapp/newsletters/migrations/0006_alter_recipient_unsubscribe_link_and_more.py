# Generated by Django 4.1.3 on 2022-11-16 19:54

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('newsletters', '0005_recipient_unsubscribe_link_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipient',
            name='unsubscribe_link',
            field=models.UUIDField(default=uuid.uuid4, editable=False, null=True),
        ),
        migrations.AlterField(
            model_name='topicsusbscription',
            name='unsubscribe_link',
            field=models.UUIDField(default=uuid.uuid4, editable=False, null=True),
        ),
    ]
