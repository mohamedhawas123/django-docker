from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from .views import UseView

router = DefaultRouter()
router.register('', UseView, basename='user')


urlpatterns = router.urls
