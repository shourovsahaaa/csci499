from django.urls import path
from . import views


#URL configuration
urlpatterns = [
    path('hello/', views.say_hello)#note that we're not calling this funciton, just passing a referencd to it)
]