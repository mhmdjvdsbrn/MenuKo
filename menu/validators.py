
from django.core.exceptions import ValidationError

def validate_banner_size_kb(file):
    max_size_kb =2000

    if file.size > max_size_kb *1024 :
        raise ValidationError(f'file cannot be large than {max_size_kb}KB')


def validate_profile_size_kb(file):
    max_size_kb =1000

    if file.size > max_size_kb *1024 :
        raise ValidationError(f'file cannot be large than {max_size_kb}KB')


def validate_image_size_kb(file):
    max_size_kb =500

    if file.size > max_size_kb *1024 :
        raise ValidationError(f'file cannot be large than {max_size_kb}KB')