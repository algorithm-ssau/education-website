from django.contrib import admin
from django.urls import include, path
from Courses.views import CourseCreateView, TaskBlockCreateView, TheoryBlockCreateView, UserCoursesListView, EnrollCourseView, UserEnrollmentsListView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('Registration.urls', namespace='Registration')),
    path('create_course/', CourseCreateView.as_view(), name='create_course'),
    path('add_task_block/', TaskBlockCreateView.as_view(), name='add_task_block'),
    path('add_theory_block/', TheoryBlockCreateView.as_view(), name='add_theory_block'),
    path('my_courses/', UserCoursesListView.as_view(), name='user_courses'),
    path('enroll_course/', EnrollCourseView.as_view(), name='enroll_course'),
    path('my_enrollments/', UserEnrollmentsListView.as_view(), name='user_enrollments'),
]
