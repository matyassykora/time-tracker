from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TrackerSerializer
from .models import Tracker


class TrackerView(viewsets.ModelViewSet):
    serializer_class = TrackerSerializer
    queryset = Tracker.objects.all()
