from django.db import models
from datetime import datetime


class Solutions(models.Model):
    title = models.CharField(max_length=500)
    context = models.TextField()
    video = models.FileField(upload_to='static/solution-videos/')
    # video = models.CharField(max_length=300)
    created_at = models.DateTimeField(default=datetime.now, blank=True)

    def __str__(self):
        return self.title
