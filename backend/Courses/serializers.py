from rest_framework import serializers
from .models import Course, TaskBlock, TheoryBlock, Enrollment

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'title', 'description']

class TheoryBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = TheoryBlock
        fields = ['id_page', 'course', 'text', 'video_url', 'image', 'captioned_image', 'caption', 'page_number']

class TaskBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskBlock
        fields = ['id', 'course', 'task_text', 'comment']

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ['id', 'user', 'course', 'enrollment_date']
        