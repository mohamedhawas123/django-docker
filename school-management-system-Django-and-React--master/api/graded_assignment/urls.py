
from rest_framework.routers import DefaultRouter
from django.urls import path, include, re_path
from api.views import GradedAssignmentView, CreateGridApi


urlpatterns = [
    path('', GradedAssignmentView.as_view()),
    path('create-grid/', CreateGridApi.as_view())
]
