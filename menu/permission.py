# permissions.py

from rest_framework import permissions


class AuthorAllStaffAllButEditOrReadOnly(permissions.BasePermission):

    # edit_methods = ("PUT", "PATCH")

    def has_permission(self, request, view):
    
        if request.user.is_staff :
            return True
    #     if request.user.is_authenticated:
    #         return True

    # def has_object_permission(self, request, view, obj):
    #     # if request.user.is_staff :
    #     #     return True

    #     return False