from django.contrib import admin
from .models import Tracker


class TrackerAdmin(admin.ModelAdmin):
    list_display = ('id', 'timestamp')


admin.site.register(Tracker, TrackerAdmin)
