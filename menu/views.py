from rest_framework.response import Response
from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from .serializer import *
from rest_framework import status
from django.shortcuts import get_object_or_404
import jwt
from django.contrib.auth import get_user_model
from django.conf import settings
from .permission import AuthorAllStaffAllButEditOrReadOnly
from rest_framework.permissions import IsAuthenticated

from rest_framework.renderers import TemplateHTMLRenderer

# take user from jwt token
def get_owner_id(self,request):
            token = request.headers.get('Authorization').split(' ')[1]
            payload = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=['HS256'])
            user_id = get_user_model().objects.get(id=payload['user_id'])
            owner = Owner.objects.get(user_id=user_id.id)
            owner = owner.pk

            return owner

#owner

class OwnerDetailView(APIView):
    permission_classes = [IsAuthenticated] 

    def get(self ,request):
        (owner ,created) = Owner.objects.get_or_create(user_id = request.user.id)
        serializer = OwnerSeializer(owner)
        return Response(serializer.data)

    def put(self ,request):
            (owner ,created) = Owner.objects.get_or_create(user_id = request.user.id)
            serializer = OwnerSeializer(owner , data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

#Menu
#menu for owner
class MenuView(APIView):
    permission_classes = [AuthorAllStaffAllButEditOrReadOnly] # Custom permission class used
    def get(self,request):
        owner = get_owner_id(self,request)
        queryset = Category.objects.order_by('id').filter(owner=owner)
        serializer = MenuSerializer(queryset ,many=True)
        return Response(serializer.data)  

#menu for customer
class MenuBarcodeView(APIView):
    # renderer_classes = [TemplateHTMLRenderer]

    # template_name = 'first.html'

    def get(self,request,pk):
        queryset = Category.objects.order_by('id').filter(owner__pk=pk)
        serializer = MenuSerializer(queryset ,many=True)
        return Response(serializer.data)  

#categort for menu
class ListCategoryMenuView(APIView):
    # permission_classes = [AuthorAllStaffAllButEditOrReadOnly] # Custom permission class used
    def get(self,request,pk):
        queryset = Category.objects.order_by('id').filter(owner__pk=pk)
        serializer = CategortListForMenu(queryset ,many=True)
        return Response(serializer.data)
        
#owner for menu
class OwnerMenuView(APIView):
    # permission_classes = [AuthorAllStaffAllButEditOrReadOnly] # Custom permission class used
    def get(self,request,pk):
        queryset = Owner.objects.filter(pk=pk)
        serializer = OwnerForMenuSerializer(queryset ,many=True)
        return Response(serializer.data)

#product

#create product
class CreateProductView(APIView):
    permission_classes = [AuthorAllStaffAllButEditOrReadOnly] # Custom permission class used

    def post(self,request):
        owner = get_owner_id(self,request)
        data = request.data
        data['owner'] = owner
        serializer = ProductCreateSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data ,status=status.HTTP_201_CREATED)
#list product
class ListProductView(APIView):
    permission_classes = [AuthorAllStaffAllButEditOrReadOnly] # Custom permission class used
    def get(self,request):
        owner = get_owner_id(self, request)
        queryset = Product.objects.filter(owner=owner)
        serializer = ProductCreateSerializer(queryset ,many=True)
        return Response(serializer.data) 

#delete and update product

class DeletePutProductView(APIView):
    permission_classes = [AuthorAllStaffAllButEditOrReadOnly] # Custom permission class used
    def put(self ,request,pk):
        owner = get_owner_id(self,request)
        data = request.data
        data['owner'] = owner
        product = get_object_or_404(Product ,pk=pk ,owner=owner)
        serializer = ProductCreateSerializer(product ,data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)   

    def delete(self, request, pk, format=None):
        owner = get_owner_id(self,request)
        category = get_object_or_404(Product ,pk=pk ,owner=owner)
        category.delete()
        return Response(status=status.HTTP_200_OK)

#Category
class CreateCategoryView(APIView):
    permission_classes = [AuthorAllStaffAllButEditOrReadOnly] # Custom permission class used
    def post(self,request):
        owner = get_owner_id(self,request)
        data = request.data.copy()
        data['owner'] = owner
        serializer = CategoryCreateSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data ,status=status.HTTP_201_CREATED)
#list category
class ListCategoryView(APIView):
    permission_classes = [AuthorAllStaffAllButEditOrReadOnly] # Custom permission class used
    def get(self,request):
        owner = get_owner_id(self,request)
        queryset = Category.objects.order_by('id').filter(owner=owner)
        serializer = CategoryListSerializer(queryset ,many=True)
        return Response(serializer.data)  
#delete and update categoty
class DeletePutCategoryView(APIView):
    permission_classes = [AuthorAllStaffAllButEditOrReadOnly] # Custom permission class used
    def put(self ,request,pk):
        owner = get_owner_id(self,request)
        data = request.data
        data['owner'] = owner
        category = get_object_or_404(Category ,pk=pk ,owner=owner)
        serializer = CategoryCreateSerializer(category ,data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)   

    def delete(self, request, pk, format=None):
        owner = get_owner_id(self,request)
        category = get_object_or_404(Category ,pk=pk ,owner=owner)
        category.delete()
        return Response(status=status.HTTP_200_OK)



