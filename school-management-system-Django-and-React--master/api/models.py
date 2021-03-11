from django.db import models
from users.models import User


class Assaignment(models.Model):
    title = models.CharField(max_length=254)
    teacher = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class GradedAssignment(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    assignment = models.ForeignKey(
        Assaignment, on_delete=models.SET_NULL, blank=True, null=True)
    grade = models.FloatField()

    def __str__(self):
        return self.student.username


class Choice(models.Model):

    title = models.CharField(max_length=254)

    def __str__(self):
        return self.title


class Question(models.Model):
    question = models.CharField(max_length=245, blank=True, null=True)
    choices = models.ManyToManyField(Choice)
    answar = models.ForeignKey(
        Choice, related_name='answar', on_delete=models.CASCADE, blank=True, null=True)

    assaignment = models.ForeignKey(
        Assaignment, related_name='questions', on_delete=models.CASCADE, blank=True, null=True)
    ordering = models.SmallIntegerField(blank=True, null=True)

    def __str__(self):
        return self.question
