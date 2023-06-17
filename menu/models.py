from django.db import models
from django_jalali.db import models as jmodels
import qrcode
from io import BytesIO
from django.core.files import File
from PIL import Image, ImageDraw
from django.contrib.auth import get_user_model
from django.conf import settings
User = settings.AUTH_USER_MODEL
from .validators import *


def get_banner_image_path(self ,file_name):
    return f'{self.name_store}/banner'
def get_profile_image_path(self ,file_name):
    return f'{self.name_store}/profile'
def nameFile(instance, filename):
    return '/'.join(['images/', str(instance.id), filename])

class Owner(models.Model):
    user = models.OneToOneField(User ,on_delete=models.CASCADE)
    name_store = models.CharField(max_length=100,blank=True)
    # full_name = models.CharField(max_length=100,blank=True)
    phone_store = models.CharField(max_length=100,blank=True)
    address = models.TextField(blank=True)
    created = models.DateTimeField(auto_now_add=True)
    banner_image = models.CharField(max_length=255,blank=True)
    profile_image = models.CharField(max_length=255,blank=True)
    barcode = models.ImageField(blank=True , upload_to=nameFile)


    def __str__(self):
        return self.name_store
        
    def save(self ,*args , **kwargs):
        default_url = f'https://menuko.ir/menu?id={self.id}'
        qr_image = qrcode.make(default_url)
        qr_offset = Image.new('RGB' ,(365,365) ,'white')
        qr_offset.paste(qr_image)
        file_name = f'{self.id}.png'
        stream = BytesIO()
        qr_offset.save(stream , 'PNG')
        self.barcode.save(file_name ,File(stream) ,save=False)
        qr_offset.close()
        super().save(*args ,**kwargs)
        

class Category(models.Model):
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE )

    category_name = models.CharField(max_length=100)
    product = models.ManyToManyField('Product' , blank=True ,related_name='+')

    def __str__(self):
        return self.category_name

class Product(models.Model):
    owner = models.ForeignKey(Owner ,on_delete=models.CASCADE ,related_name='owner_id')
    title = models.CharField(max_length=150)
    # image = models.ImageField(blank=True ,null=True,upload_to=f'{nameFile}' ,validators =[validate_image_size_kb])
    image = models.CharField(max_length=255)

    price = models.IntegerField()
    # is_active = models.BooleanField(default=True ,blank=True)
    ingredients = models.TextField(max_length=400,blank=True,null=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT ,related_name='products')
    

    def __str__(self):
        return self.title





# Create your models here.
