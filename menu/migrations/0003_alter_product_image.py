# Generated by Django 4.1.7 on 2023-02-21 17:13

from django.db import migrations, models
import menu.validators


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0002_alter_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=models.ImageField(blank=True, upload_to='<function nameFile at 0x103475bd0>/products', validators=[menu.validators.validate_image_size_kb]),
        ),
    ]
