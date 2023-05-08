from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Players
from .models import UserCred
from .serializers import PlayerSerializer
from django.http import JsonResponse
import json
from django.shortcuts import get_object_or_404
from . import soccerbanter



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
    
    
    person = get_object_or_404(Players, name=name)
    data = {
        
        'age': person.age,
        'name': person.name,
        'squad': person.squad,
        'position': person.position,
        'nation' : person.nation
    }
    return JsonResponse(data)

@api_view(['POST'])
def getsoccerbanter(request):
    request.body
    data = json.loads(request.body)
    name = data.get("name", "")
    text = data.get("text", "")
    opinion = data.get("opinion", "")
    result = soccerbanter.beginbanter(name, opinion)
    

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
    usercred = UserCred(username=newUsername, password=newPassword)
    usercred.save()
    return JsonResponse({'message': 'User credentials saved successfully.'})
    

@api_view(['POST'])
def postCheckCreds(request):
    submittedUsername = request.data.get('submittedUsername')
    submittedPassword = request.data.get('submittedPassword')
    usernames = list(UserCred.objects.values_list('username', flat=True))
    if submittedUsername in usernames:
        creds = get_object_or_404(UserCred, username=submittedUsername)
        if submittedPassword == creds.password:
            data = {
                'value': 0,
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

