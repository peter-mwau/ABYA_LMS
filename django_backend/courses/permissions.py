from rest_framework.permissions import BasePermission

# Match course creator to the course they created
class IsTeacherOfCourse(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.teacher == request.user

# Match the chapter creator (teacher) to the chapter of a course they created
class IsTeacherOfChapterCourse(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.course.teacher == request.user

# Match the lesson creator to the specific lesson of the chpter's lesson
class IsTeacherOfLessonChapterCourse(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.chapter.course.teacher == request.user
