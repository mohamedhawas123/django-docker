from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('user/', include('users.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('assiagnment/', include('api.assaignment.urls')),
    path('graded/', include('api.graded_assignment.urls')),
    path('admin/', admin.site.urls),

    # re_path(r'^.*', TemplateView.as_view(template_name='index.html')),


]
