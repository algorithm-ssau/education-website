from rest_framework import generics, permissions
from .models import Course, TaskBlock, TheoryBlock, Enrollment
from .serializers import CourseSerializer, TaskBlockSerializer, TheoryBlockSerializer, EnrollmentSerializer
from rest_framework.exceptions import PermissionDenied

class CourseCreateView(generics.CreateAPIView):
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class TaskBlockCreateView(generics.CreateAPIView):
    serializer_class = TaskBlockSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        course = serializer.validated_data['course']
        if course.owner != self.request.user:
            raise PermissionDenied("Вы не можете размещать материалы, т.к. вы не владелец курса.")
        serializer.save()

class TheoryBlockCreateView(generics.CreateAPIView):
    serializer_class = TheoryBlockSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        course = serializer.validated_data['course']
        if course.owner != self.request.user:
            raise PermissionDenied("Вы не можете размещать материалы, т.к. вы не владелец курса.")
        serializer.save()

class UserCoursesListView(generics.ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Course.objects.filter(owner=self.request.user)

class EnrollCourseView(generics.CreateAPIView):
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        course = serializer.validated_data['course']
        if Enrollment.objects.filter(user=self.request.user, course=course).exists():
            raise serializers.ValidationError("Вы уже и так записаны на этот курс.")
        serializer.save(user=self.request.user)

class UserEnrollmentsListView(generics.ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Course.objects.filter(enrollments__user=self.request.user)
