from rest_framework import serializers
from .models import *
from drf_writable_nested import UniqueFieldsMixin , WritableNestedModelSerializer

from drf_extra_fields.fields import Base64ImageField


# #list products
# class ProductSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Product
#         fields = ['title' , 'price' ,'ingredients']



#list category for menu
class CategortListForMenu(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','category_name' ,'owner']
#owner for menu
class OwnerForMenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = ['id','name_store' ,'phone_store','address','banner_image','profile_image']

#create product
class CategorySerializer(UniqueFieldsMixin,WritableNestedModelSerializer):
        # products = ProductSerializer(many=True)
        class Meta:
            model = Category
            fields = ['id','category_name' ]


class ProductCreateSerializer(UniqueFieldsMixin,WritableNestedModelSerializer):
    # image = Base64ImageField(
    #     max_length=None, use_url=True,
    # )
    image = serializers.CharField(required=False)

    category = CategorySerializer()
    class Meta:
        model = Product
        fields = ['id','title' , 'price' ,'ingredients' ,'image' ,'category','owner']

#list Category
class CategoryListSerializer(serializers.ModelSerializer):
    products_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id','category_name','owner','products_count']
    def get_products_count(self, obj):
        return obj.products.count()
#create ,update Category
class CategoryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','category_name','owner']

#Menu
class ProductsForMenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id' ,'owner','title' ,'price' ,'ingredients' ,'image']


class MenuSerializer(serializers.ModelSerializer):
        
        products = ProductsForMenuSerializer(many=True,read_only=True)
        class Meta:
            model = Category
            fields = ['category_name' ,'products' ,'owner']
    

#owner 
class OwnerSeializer(serializers.ModelSerializer):
    class Meta:
        model = Owner
        fields = ['id','name_store' ,'phone_store' ,'address' ,'banner_image','profile_image' ,'created' ,'barcode']