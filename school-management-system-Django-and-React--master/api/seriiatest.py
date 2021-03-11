from rest_framework import serializers
from .models import Assaignment, Question, Choice, GradedAssignment
from users.models import User
from django.shortcuts import render, get_object_or_404, get_list_or_404
from users.models import User


class AssignmentSerializers(serializers.ModelSerializer):

    questions = serializers.SerializerMethodField()
    teacher = StringSerializer(many=False)

    class Meta:
        model = Assaignment
        fields = ('__all__')

    def get_questions(self, obj):
        return QuestionSerializer(obj.questions.all(), many=True).data

    def create(self, request):
        data = request.data
        assignment = Assaignment()
        assignment.title = data['title']
        teacher = User.objects.get(username=data['teacher'])
        assignment.title = teacher
        assignment.save()

        order = 1
        for q in data['questions']:
            question = Question()
            question.question = q['title']
            question.ordering = order
            question.save()

            for c in data['choices']:
                choice = Choice()
                choice.title = c
                choice.save
                question.choice.add(choice)

            answer = get_object_or_404(Choice, title=data['answer'])
            question.answar = answer
            question.assaignment = assignment
            question.save()
            order += 1
        return assignment
