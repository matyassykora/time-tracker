from django.db import models


class Tracker(models.Model):
    title = models.CharField(max_length=100, blank=True)
    timestamp = models.IntegerField()
