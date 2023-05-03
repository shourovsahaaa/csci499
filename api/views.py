from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Players
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




    
   

