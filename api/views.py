from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Players
from .serializers import PlayerSerializer
from django.http import JsonResponse
import json
from django.shortcuts import get_object_or_404
from . import soccerbanter
from .models import League
from .models import UserCred
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.name
        # ...

        return 
    



# Create your views here.

@api_view(['GET'])
def getRoutes(request):
     routes = [
        {
            'Endpoint': '/players/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of players'
        },
        {
            'Endpoint': '/players/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
     
     return Response( routes)


@api_view(['GET'])
def getPlayers(request):
    names = list(Players.objects.values_list('name', flat=True))
    return JsonResponse({'names': names})



@api_view(['GET'])
def getPlayer(request):
    names = Players.objects.values_list('name', flat=True)
    return JsonResponse(list(names), safe=False)


@api_view(['GET'])
def get_stats(request, name):
    
    
    data = soccerbanter.playerlist(name)
    return JsonResponse(data)


@api_view(['GET'])
def football_leagues(request):
    data = soccerbanter.leagueupdates()

    print(JsonResponse(data))
    return JsonResponse(data)

@api_view(['GET'])
def get_options(request):
    options = ['Base', 'Shooting', 'Passing', 'Shot Creating Actions', 'Goal Creating Actions', 'Tackles', 'Presses', 'Blocks', 'Interception', 'Clearences and Errors', 'Touches', 'Dribbles', 'Carries', 'Receives', 'Infractions' ]
    data = {"options" : options}
    return JsonResponse(data)

@api_view(['POST'])
def getsoccerbanter(request):
    request.body
    data = json.loads(request.body)
    name = data.get("name", "")
    text = data.get("text", "")
    opinion = data.get("opinion", "")
    aspect = data.get("aspect", "")
    
    result = soccerbanter.beginbanter(name, text, opinion, aspect)
    
    return JsonResponse({"result": result})
# Parse usernames and return true if a username can be used.
@api_view(['GET'])
def getUsernames(request):
    names = list(UserCred.objects.values_list('username', flat=True))
    return JsonResponse({'usernames': names})

# Save the username and password in the user_creds
@api_view(['POST'])
def postUserCreds(request):
    newUsername = request.data.get('username')
    newPassword = request.data.get('password')
    user = User.objects.create_user(newUsername, "null@null.com", newPassword)
    usercred = UserCred(username=newUsername, favoritedPlayers = "")
    usercred.save()
    return JsonResponse({'message': 'User credentials saved successfully.'})
    

@api_view(['POST'])
def postCheckCreds(request):
    submittedUsername = request.data.get('submittedUsername')
    submittedPassword = request.data.get('submittedPassword')
    usernames = list(UserCred.objects.values_list('username', flat=True))
    match = authenticate(username=submittedUsername, password = submittedPassword)
    if submittedUsername in usernames:
        creds = get_object_or_404(UserCred, username=submittedUsername)
        if match is not None:
            favoritePlayers = creds.favoritedPlayers
            data = {
                'value': 0,
                'username_': submittedUsername,
                'favoritePlayers_': favoritePlayers,
                'message': 'Success! Logged in.',
            }
        else:
            data = {
                'value': 1,
                'message': 'Incorrect username or password. Try again.',
            }

    else:
        data = {
                'value': 2,
                'message': 'Incorrect username or password. Try again.',
            }
    return JsonResponse(data)

@api_view(['POST'])
def postUpdateFavoritePlayers(request):
    username = request.data.get('username')
    usercred = get_object_or_404(UserCred, username=username)
    
        # Remove trailing commas
    while usercred.favoritedPlayers.endswith(','):
        usercred.favoritedPlayers = usercred.favoritedPlayers.rstrip(',')
    
    # Remove leading comma
    while usercred.favoritedPlayers.startswith(','):
        usercred.favoritedPlayers = usercred.favoritedPlayers.lstrip(',')
    
    # Remove consecutive commas
    while ',,' in usercred.favoritedPlayers:
        usercred.favoritedPlayers = usercred.favoritedPlayers.replace(',,', ',')

    data = {
        'favoritePlayers': usercred.favoritedPlayers,
    }
    return JsonResponse(data)

@api_view(['POST'])
def postAddFavoritePlayers(request):
    newPlayerName = request.data.get('playerName')
    username = request.data.get('username')
    usercred = get_object_or_404(UserCred, username=username)
    if usercred.favoritedPlayers:
        usercred.favoritedPlayers += ',' + newPlayerName  # Add the new player name to the existing string
    else:
        usercred.favoritedPlayers = newPlayerName  # Start a new string with the new player name
    
    usercred.favoritedPlayers = usercred.favoritedPlayers.replace(',,', ',')
    
        # Remove trailing commas
    while usercred.favoritedPlayers.endswith(','):
        usercred.favoritedPlayers = usercred.favoritedPlayers.rstrip(',')
    
    # Remove leading comma
    while usercred.favoritedPlayers.startswith(','):
        usercred.favoritedPlayers = usercred.favoritedPlayers.lstrip(',')
    
    # Remove consecutive commas
    while ',,' in usercred.favoritedPlayers:
        usercred.favoritedPlayers = usercred.favoritedPlayers.replace(',,', ',')
    
    usercred.save()
    
    return JsonResponse({'message': 'Favorite Player saved successfully.'})

@api_view(['POST'])
def postRemoveFavoritePlayers(request):
    removePlayerName = request.data.get('playerName')
    username = request.data.get('username')
    usercred = get_object_or_404(UserCred, username=username)
    
    if removePlayerName in usercred.favoritedPlayers:
        usercred.favoritedPlayers = usercred.favoritedPlayers.replace(removePlayerName, '')  # Remove player name
        usercred.favoritedPlayers = usercred.favoritedPlayers.replace(',,', ',')  # Remove consecutive commas
    
    # Remove trailing commas
    while usercred.favoritedPlayers.endswith(','):
        usercred.favoritedPlayers = usercred.favoritedPlayers.rstrip(',')
    
    # Remove leading comma
    while usercred.favoritedPlayers.startswith(','):
        usercred.favoritedPlayers = usercred.favoritedPlayers.lstrip(',')
    
    # Remove consecutive commas
    while ',,' in usercred.favoritedPlayers:
        usercred.favoritedPlayers = usercred.favoritedPlayers.replace(',,', ',')
    
    usercred.save()
    
    return JsonResponse({'message': 'Favorite Player removed successfully.'})