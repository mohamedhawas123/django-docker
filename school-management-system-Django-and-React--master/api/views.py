from rest_framework import viewsets
from .models import Assaignment, Choice, GradedAssignment
from .serializers import AssignmentSerializers, GradedAssignmentSerializers
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from rest_framework import generics


class AssignmentViewSet(viewsets.ModelViewSet):
    serializer_class = AssignmentSerializers
    queryset = Assaignment.objects.all().order_by('-id')

    def create(self, request):
        serializer = AssignmentSerializers(data=request.data)
        if serializer.is_valid():
            assignment = serializer.create(request)
            if assignment:
                return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)


class GradedAssignmentView(generics.ListAPIView):
    serializer_class = GradedAssignmentSerializers
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        queryset = GradedAssignment.objects.all()
        username = self.request.query_params.get('username', None)
        if username is not None:
            queryset = queryset.filter(student__username=username)
        return queryset


class CreateGridApi(generics.CreateAPIView):
    serializer_class = GradedAssignmentSerializers
    queryset = GradedAssignment.objects.all()

    def post(self, request):
        print(request.data)
        serializer = GradedAssignmentSerializers(data=request.data)
        serializer.is_valid()
        graded_assignment = serializer.create(request)
        if graded_assignment:

            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)
