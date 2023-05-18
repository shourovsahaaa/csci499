from django.contrib import admin

#Register your models here.

from .models import Players
from .models import League
from .models import UserCred
from .models import Teams

admin.site.register(Players)
admin.site.register(League)
admin.site.register(UserCred)
admin.site.register(Teams)