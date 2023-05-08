from django.contrib import admin

# Register your models here.

from .models import Players
from .models import UserCred
from .models import User
admin.site.register(Players)

admin.site.register(UserCred)

admin.site.register(User)
