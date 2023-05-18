from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', views.getRoutes, name="routes"),
    path('players/', views.getPlayers, name = "players"),
    path('players/<str:pk>/', views.getPlayer, name = "player"),
    path('soccerbanter/', views.getsoccerbanter),
    path('player/<str:name>/stats/', views.get_stats, name = 'player_stats'),
    path('football-leagues/', views.football_leagues),
    path('usercreds/usernames/', views.getUsernames),
    path('usercreds/postusercreds/', views.postUserCreds),
    path('usercreds/postcheckcreds/', views.postCheckCreds),
    path('usercreds/postupdatefavoriteplayers/', views.postUpdateFavoritePlayers),
    path('usercreds/postaddfavoriteplayers/', views.postAddFavoritePlayers),
    path('usercreds/postremovefavoriteplayers/', views.postRemoveFavoritePlayers),
]