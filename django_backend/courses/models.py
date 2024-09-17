from django.db import models
from django.urls import reverse
from users.models import User




# Create your models here.
# 1. Course model
class Course(models.Model):
    course_name = models.CharField(max_length=200)
    course_description = models.TextField()
    teacher = models.ForeignKey(User, related_name="course", on_delete=models.CASCADE)
    teacher_name = models.CharField(max_length=100, null=True)
    students = models.ManyToManyField(User, through='Enrollment', related_name="student_course")
    picture = models.ImageField(upload_to="course_pictures", null=True, blank=True)
    approved = models.BooleanField(default=False)  # Approval status field
    approval_count = models.IntegerField(default=0)  # Approval count field
    teacher_eth_address = models.CharField(max_length=42, default='0x..')  # Ethereum address field

    def total_quizzes(self):
        return self.chapters.aggregate(total_quizzes=models.Count('chapter_quizzes'))['total_quizzes']
    
    def __str__(self):
        return self.course_name

    def get_absolute_url(self):
        return reverse('courses:detail', kwargs={'pk': self.pk})

    class Meta:
        ordering = ['course_name']

# 2. Chapter Model
class Chapter(models.Model):
    chapter_name = models.CharField(max_length=200)
    chapter_description = models.TextField()
    course = models.ForeignKey(Course, related_name="chapters", on_delete=models.CASCADE)
    chapter_quiz = models.ForeignKey('assignments.Quiz', related_name='quiz', on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.chapter_name
    class Meta:
        ordering = ['created_at']

# 3. Lesson Model
class Lesson(models.Model):
    lesson_name = models.CharField(max_length=200)
    lesson_content = models.TextField(
        'Lesson Content',
        max_length=10000,
        help_text='Enter the course content in Markdown format.',
        blank=True,
        null=True
    )

    chapter = models.ForeignKey(Chapter, related_name="lessons", on_delete=models.CASCADE)
    video = models.ForeignKey('resources.VideoLesson', related_name='video', on_delete=models.CASCADE, null=True, blank=True)
    word_file = models.FileField(upload_to="word_lesson_files",null=True, blank=True)
    
    def __str__(self):
        return self.lesson_name
    class Meta:
        ordering = ['lesson_name']

# 4. Enrollment model
class Enrollment(models.Model):
    course = models.ForeignKey(Course, related_name="enrollments",on_delete=models.CASCADE)
    student = models.ForeignKey(User, related_name="user_courses", on_delete=models.CASCADE)
    student_eth_address = models.CharField(max_length=42, default='0x..')

    def __str__(self):
        user_name = f'{self.student.first_name} {self.student.last_name}'

        return f'{user_name} enrolled in {self.course.course_name}'

    class Meta:
        unique_together = ('course', 'student')

# 5. Model to handle completed lessons
class CompletedLesson(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='completed_lessons')
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    completed_at = models.DateTimeField(auto_now_add=True)
    enrollment = models.ForeignKey(Enrollment, on_delete=models.CASCADE, blank=True)

    class Meta:
        unique_together = ('user', 'lesson')

# 6. Model to handle completed course
class CompletedCourse(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    completed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'course')

# 7. Certificate issued after course completion model
class Certificate(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    certificate_id = models.CharField(max_length=200, null=True, blank=True)
    name = models.CharField(max_length=200)
    issuer = models.CharField(max_length=200)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    issued_at = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return self.user.username + " " + self.course.course_name
    class Meta:
        unique_together = ('user', 'course')
