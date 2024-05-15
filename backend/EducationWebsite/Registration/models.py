from django.db import models
from django.contrib.auth.models import AbstractUser

class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'

class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)

class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)

class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'

class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)

class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)

class Course(models.Model):
    id = models.UUIDField(primary_key=True)
    name = models.TextField()
    description = models.TextField()
    moderation_status = models.CharField(max_length=10, blank=True, null=True)
    price = models.DecimalField(max_digits=65535, decimal_places=65535)
    image = models.ForeignKey('File', models.DO_NOTHING, blank=True, null=True)
    owner = models.ForeignKey('User', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'course'

class CourseAdmin(models.Model):
    id = models.UUIDField(primary_key=True)
    course = models.ForeignKey(Course, models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey('User', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'course_admin'

class CourseBlock(models.Model):
    id = models.UUIDField(primary_key=True)
    type = models.CharField(max_length=10)
    title = models.TextField()
    content = models.TextField()
    course = models.ForeignKey(Course, models.DO_NOTHING)
    pin_priority = models.DecimalField(max_digits=65535, decimal_places=65535)
    test = models.ForeignKey('Test', models.DO_NOTHING, blank=True, null=True)
    max_score = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'course_block'

class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'

class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)

class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'

class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'

class File(models.Model):
    id = models.UUIDField(primary_key=True)
    path = models.CharField(unique=True, max_length=250)

    class Meta:
        managed = False
        db_table = 'file'

class Notification(models.Model):
    id = models.UUIDField(primary_key=True)
    title = models.CharField(max_length=20)
    description = models.CharField(max_length=40)
    creation_date = models.DateField()
    user = models.ForeignKey('User', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'notification'

class RefreshToken(models.Model):
    id = models.UUIDField(primary_key=True)
    token = models.CharField(unique=True, max_length=24)
    valid_until = models.DateField()

    class Meta:
        managed = False
        db_table = 'refresh_token'

class Student(models.Model):
    course = models.OneToOneField(Course, models.DO_NOTHING, primary_key=True)  # The composite primary key (course_id, user_id) found, that is not supported. The first column is selected.
    user = models.ForeignKey('User', models.DO_NOTHING, unique=True)
    review_content = models.TextField(blank=True, null=True)
    review_score = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'student'
        unique_together = (('course', 'user'),)

class StudentCourseBlock(models.Model):
    student_course_id = models.UUIDField()
    student_user = models.ForeignKey(Student, models.DO_NOTHING, to_field='user_id')
    course_block = models.OneToOneField(CourseBlock, models.DO_NOTHING, primary_key=True)  # The composite primary key (course_block_id, student_user_id, student_course_id) found, that is not supported. The first column is selected.
    is_completed = models.BooleanField()
    score = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    task_answer = models.ForeignKey('TaskAnswer', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'student_course_block'
        unique_together = (('course_block', 'student_user', 'student_course_id'),)

class Tag(models.Model):
    id = models.UUIDField(primary_key=True)
    name = models.CharField(max_length=20)

    class Meta:
        managed = False
        db_table = 'tag'

class TagCourse(models.Model):
    tag = models.OneToOneField(Tag, models.DO_NOTHING, primary_key=True)  # The composite primary key (tag_id, course_id) found, that is not supported. The first column is selected.
    course = models.ForeignKey(Course, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'tag_course'
        unique_together = (('tag', 'course'),)

class TaskAnswer(models.Model):
    id = models.UUIDField(primary_key=True)
    content = models.TextField()
    score = models.DecimalField(max_digits=65535, decimal_places=65535)
    teacher_comment = models.TextField()
    check_date = models.DateField()
    teacher = models.ForeignKey(CourseAdmin, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'task_answer'

class TaskAnswerFile(models.Model):
    task_answer = models.OneToOneField(TaskAnswer, models.DO_NOTHING, primary_key=True)  # The composite primary key (task_answer_id, file_id) found, that is not supported. The first column is selected.
    file = models.ForeignKey(File, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'task_answer_file'
        unique_together = (('task_answer', 'file'),)

class Test(models.Model):
    id = models.UUIDField(primary_key=True)
    questions = models.TextField()  # This field type is a guess.
    correct_answers = models.TextField()  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'test'

class User(AbstractUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['password']
    id = models.UUIDField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=200, blank=True, null=True)
    email = models.CharField(unique=True, max_length=50)
    password = models.CharField(max_length=30)
    refresh_token = models.ForeignKey(RefreshToken, models.DO_NOTHING, blank=True, null=True)
    profile_image = models.ForeignKey(File, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user'