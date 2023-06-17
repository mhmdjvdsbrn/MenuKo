

from django.urls import path
from django.urls.conf import include
from .views import *
from rest_framework import routers

urlpatterns = [

    path('category/create',CreateCategoryView.as_view()), #create category
    path('category/',ListCategoryView.as_view()), #list and delete category
    path('category/<int:pk>/',DeletePutCategoryView.as_view()), #update and delete category


    path('product/create',CreateProductView.as_view()), #create product
    path('product/',ListProductView.as_view()), #create product
    path('product/<int:pk>/',DeletePutProductView.as_view()), #update and delete category

    path('owner/',OwnerDetailView.as_view()), #list and delete category
    
    path('menu/',MenuView.as_view()), #list and delete category
    path('menu/<int:pk>/',MenuBarcodeView.as_view()), #list and delete category
    path('menu/category/<int:pk>',ListCategoryMenuView.as_view()), #list category
    path('menu/owner/<int:pk>',OwnerMenuView.as_view()), #list category







]