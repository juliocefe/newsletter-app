from django.db import models


class MyBaseModel(models.Model):

    """Newsletter base model.

    MyBaseModel acts as an abstract base class from which every
    other model in the project will inherit. This class provides
    every table with the following attributes:
        + created_at (DateTime): Store the datetime the object was created.
        + modified_at (DateTime): Store the last datetime the object was modified.
    """
    created_at = models.DateTimeField(
        verbose_name="created at", 
        auto_now_add=True,
        help_text='Date time on which the object was created.',
    )
    modified_at = models.DateTimeField(
        verbose_name='modified at',
        auto_now=True,
        help_text='Date time on which the object was last modified.',
    )

    class Meta:
        """Meta option."""
        abstract = True
        default_manager_name = "objects"
        get_latest_by = 'created_at'
        ordering = ['-created_at', '-modified_at']