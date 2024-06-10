from rest_framework.permissions import BasePermission

class IsTeacherOfCourse(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.teacher == request.user
    
class IsTeacherOfChapterCourse(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.course.teacher == request.user
    
class IsTeacherOfLessonChapterCourse(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.chapter.course.teacher == request.user