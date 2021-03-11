from django.shortcuts import render
from rest_framework import viewsets

from .models import User
from .serializers import Userserializers


class UseView(viewsets.ModelViewSet):
    serializer_class = Userserializers
    queryset = User.objects.all()
