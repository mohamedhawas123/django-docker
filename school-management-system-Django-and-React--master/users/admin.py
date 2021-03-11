from django.contrib import admin
from .models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


class UserAdmin(BaseUserAdmin):
    add_fields = (
        (None, {
            'fields': ('email', 'username', 'password', 'is_student', 'is_teacher')
        }),
        ('permissions', {
            'fields': ('is_teacher', 'is_student')
        })
    )

    fieldsets = (
        (None, {
            'fields': ('email', 'username', 'password', 'is_student', 'is_teacher')
        }),
        ('permissions', {
            'fields': ('is_staff', 'is_superuser')
        })
    )

    search_fields = ('username', 'email')
    list_display = ['email', 'username', 'password',
                    'is_student', 'is_teacher']
    ordering = ('email', )


admin.site.register(User, UserAdmin)
