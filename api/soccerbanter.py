

import os
import openai
import json
import requests

import pandas as pd
import numpy as np

import psycopg2 as pg
import pandas.io.sql as psql
from .models import Players

ogmsg = "You will take an input from a user on how a soccer player. then based off stats in my database you will ask for which data features you need from that player to make a determination on the veracity of the users original opinion. available features to you are , and when asking you must ask for these as they were written outside of the '-' which explains what they are, nation, pos - position, age , goals , shots, sot - shots on target, sotperc - shots on target percentage. Respond in the format(example): GIVE ME: ##age, goals, shots## "
openai.api_key = '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'

message_history = []
def chat(inp, role="user"):
    message_history.append({"role": role, "content": f"{inp}"})
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=message_history
    )
    reply_content = completion.choices[0].message.content
    if "##" in reply_content:
        message_history.append({"role": role, "content": "remember the format you need to present in e.g ## age, goals, shots ##"})
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=message_history
        )
        reply_content = completion.choices[0].message.content
    message_history.append({"role": "assistant", "content": f"{reply_content}"})
    return reply_content

def chatsetup():
    message_history.append({"role": 'user', "content": ogmsg  })
    completion = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo",
        messages=message_history
    )
    
    message_history.append({"role": "assistant", "content": "Based on the input from the user on how a soccer player, I will need the following features to make a determination on the veracity of the user's original opinion:- Nation - Pos (position)- Age - Goals - Shots - Sot (shots on target) - Sot% (shots on target percentage) Please provide me with the values for each of these features for the soccer player in question."})
    message_history.append({"role": 'system', "content": "remember to present needed data in format ##age, goals, shots##   [note that specific variables are based on what you need]"})

def dataengage(data, player):
    
    first = data.find('##')
    second = data.find('##', first+ 1)
    data = data[first+2:second]
    points = data.split(",")
  
    newpoints = []
    for a in points: #data cleaning
        a = a.replace( " ", "")
        my_instance = Players.objects.get(name=player)
        val = getattr(my_instance, a)

        newpoints.append(val)
        
 
    return (newpoints)

def beginbanter(player, user_input):
    chatsetup()
    finaldata = []
    
    neededdata = chat(user_input)
    
    ##now make a function that surfs for ##whatever## finds the needed data, lowers it and gets it from the dataframe, after which it inputs it into the chatgpt
    finaldata = dataengage(neededdata, player)
    finaldata = str(finaldata)
    convo = chat(finaldata)
    message_history = []
    return (convo)


    


