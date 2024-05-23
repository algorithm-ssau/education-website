from django.db import models
from Registration.models import User

class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses')

    def __str__(self):
        return self.title

class TheoryBlock(models.Model):
    id_page =  models.UUIDField(primary_key=True)
    course = models.ForeignKey(Course, related_name='theory_blocks', on_delete=models.CASCADE)
    text = models.TextField(blank=True)
    video_url = models.URLField(blank=True)
    image = models.ImageField(upload_to='theory_images/', blank=True)
    captioned_image = models.ImageField(upload_to='captioned_images/', blank=True)
    caption = models.CharField(max_length=300, blank=True)
    page_number = models.IntegerField(default=1)

class TaskBlock(models.Model):
    course = models.ForeignKey(Course, related_name='task_blocks', on_delete=models.CASCADE)
    task_text = models.TextField()
    comment = models.TextField(blank=True)