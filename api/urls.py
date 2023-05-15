from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('players/', views.getPlayers, name = "players"),
    path('players/<str:pk>/', views.getPlayer, name = "player"),
    path('soccerbanter/', views.getsoccerbanter),
    path('player/<str:name>/stats/', views.get_stats, name = 'player_stats'),
    path('usercreds/usernames/', views.getUsernames),
    path('usercreds/postusercreds/', views.postUserCreds),
    path('usercreds/postcheckcreds/', views.postCheckCreds),
    path('usercreds/postupdatefavoriteplayers/', views.postUpdateFavoritePlayers),
]