from django.contrib import admin
from .models import Assaignment, GradedAssignment, Choice, Question


admin.site.register(Assaignment)
admin.site.register(GradedAssignment)
admin.site.register(Choice)
admin.site.register(Question)
