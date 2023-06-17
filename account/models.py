from django.db import models
from django.db.models import IntegerField, Model
from django.contrib.auth.models import AbstractUser
# from phonenumber_field.modelfields import PhoneNumberField
from django.core.validators import MaxValueValidator, MinLengthValidator ,MaxLengthValidator

class User(AbstractUser):

    phone = IntegerField(help_text='Contact phone number',blank=True ,null=True)

# Create your models here.
