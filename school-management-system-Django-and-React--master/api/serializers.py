from rest_framework import serializers
from .models import Assaignment, Question, Choice, GradedAssignment
from users.models import User
from django.shortcuts import render, get_object_or_404, get_list_or_404


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class QuestionSerializer(serializers.ModelSerializer):
    choices = StringSerializer(many=True)

    class Meta:
        model = Question
        fields = ('id', 'choices', 'question', 'ordering')


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
        print(data)
        assignment = Assaignment()
        teacher = User.objects.get(username=data['teacher'])
        assignment.teacher = teacher
        assignment.title = data['title']
        assignment.save()

        order = 1
        for q in data['questions']:
            newQ = Question()
            newQ.question = q['title']
            newQ.ordering = order
            newQ.save()

            for c in q['choices']:
                newC = Choice()
                newC.title = c
                newC.save()
                newQ.choices.add(newC)

            newQ.answar = get_object_or_404(Choice, title=q['answer'])
            newQ.assaignment = assignment
            newQ.save()
            order += 1
        return assignment


class GradedAssignmentSerializers(serializers.ModelSerializer):
    student = StringSerializer(many=False)

    class Meta:
        model = GradedAssignment
        fields = ('__all__')

    def create(self, request):
        data = request.data
        print(data)

        assigment = Assaignment.objects.get(id=data['astnId'])
        student = User.objects.get(username=data['username'])

        gred_stn = GradedAssignment()
        gred_stn.assignment = assigment
        gred_stn.student = student

        questions = [q for q in assigment.questions.all()]
        answers = [data['answers'][a] for a in data['answers']]

        correct_answer = 0
        for i in range(len(questions)):
            if questions[i].answar.title == answers[i]:
                correct_answer += 1
            i += 1

        grade = correct_answer / len(questions) * 100

        gred_stn.grade = round(grade)
        gred_stn.save()
        return gred_stn
