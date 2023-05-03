from rest_framework.serializers import ModelSerializer
from .models import Players




class PlayerSerializer(ModelSerializer): #serializer for each model
    class Meta:
        model = Players
        fields =  '__all__'
        
    