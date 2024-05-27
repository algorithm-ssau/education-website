from rest_framework import serializers
from .models import Course, TaskBlock, TheoryBlock, Enrollment

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'title', 'description']

class TheoryBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = TheoryBlock
        fields = ['text', 'video_url', 'image', 'captioned_image', 'caption']

class TaskBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskBlock
        fields = ['id', 'task_text', 'comment']

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ['id', 'user', 'course', 'enrollment_date']
        