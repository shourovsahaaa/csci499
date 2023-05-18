import os
import openai
import json
import requests

import pandas as pd
import numpy as np


import pandas.io.sql as psql
from .models import Players
from .models import League
from django.shortcuts import get_object_or_404

ogmsg = "You will take an input from a user on how a soccer player. then based off stats in my database you will ask for which data features you need from that player to make a determination on the veracity of the users original opinion. available features to you are , and when asking you must ask for these as they were written outside of the '-' which explains what they are, nation, position - position on team, age , goals , shots, sot - shots on target, sotperc - shots on target percentage. Respond in the format(example): GIVE ME: ##age, goals, shots## "
openai.api_key = "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"






def Veracity(player, article, opinion):
    convo = []
    role =  f" {Players.objects.get(name=player).position}"
    base = f"Give an analysis on an articles veracity based on this information: {player} is a {Players.objects.get(name=player).age} year old football player[role - {role}] with {Players.objects.get(name=player).matchesplayed} matches played, {Players.objects.get(name=player).starts} starts, and {Players.objects.get(name=player).minutes} minutes in game. Their role-relevant statistics are  "
    infractions = f"There infractions have been Yellow Cards - {Players.objects.get(name=player).CrdY}, Red Cards - {Players.objects.get(name=player).CrdR}, Fouls Commited - {Players.objects.get(name=player).Fld}."
    userstuff = f" Here's the Article: {article}. Please be verbose. "
    if('GK' in role):
        stats = f" passes completed -{Players.objects.get(name=player).PasCmp}, total distanced passed {Players.objects.get(name=player).PasTotDist}, pass attempts - {Players.objects.get(name=player).PasTotAtt}, passes completed into 18yd box - {Players.objects.get(name=player).PPA}, tackles - {Players.objects.get(name=player).Tkl}, possesion winning tackles - {Players.objects.get(name=player).TklWon} , pressure on ball carrier - {Players.objects.get(name=player).Press}, times squad gained possesion upon pressure application - {Players.objects.get(name=player).PresSucc},"
    elif ('MF' in role):
        if('DF' in role):
            stats = f"tackles = {Players.objects.get(name=player).Tkl}, pass interceptions - {Players.objects.get(name=player).Int}, passes they blocked - {Players.objects.get(name=player).BlkPass}, touches in defensive 3rd - {Players.objects.get(name=player).TouDef3rd}, Mistakes made leading to opponent shot - {Players.objects.get(name=player).Err} , aerial duals won - {Players.objects.get(name=player).AerWon},goals - {Players.objects.get(name=player).goals}, passes completed -{Players.objects.get(name=player).PasCmp}, total distanced passed {Players.objects.get(name=player).PasTotDist}, pass attempts - {Players.objects.get(name=player).PasTotAtt}, passes completed into 18yd box - {Players.objects.get(name=player).PPA}, tackles - {Players.objects.get(name=player).Tkl}, possesion winning tackles - {Players.objects.get(name=player).TklWon} , pressure on ball carrier - {Players.objects.get(name=player).Press}, times squad gained possesion upon pressure application - {Players.objects.get(name=player).PresSucc},"
        elif('FW' in role):
            stats = f"goals - {Players.objects.get(name=player).goals}, passes completed -{Players.objects.get(name=player).PasCmp}, total distanced passed {Players.objects.get(name=player).PasTotDist}, pass attempts - {Players.objects.get(name=player).PasTotAtt}, passes completed into 18yd box - {Players.objects.get(name=player).PPA}, tackles - {Players.objects.get(name=player).Tkl}, possesion winning tackles - {Players.objects.get(name=player).TklWon} , pressure on ball carrier - {Players.objects.get(name=player).Press}, times squad gained possesion upon pressure application - {Players.objects.get(name=player).PresSucc}, goalpershot - {Players.objects.get(name=player).goalspersh} , shots on target - {Players.objects.get(name=player).sot}, percentage of shots on target{Players.objects.get(name=player).sotperc}, goals per shot - {Players.objects.get(name=player).goalspersh}, goals per shot on target - {Players.objects.get(name=player).goalspersot}, shots from free kicks - {Players.objects.get(name=player).ShoFK}, penaltie kicks made - {Players.objects.get(name=player).ShoPK}, distances of all shots made {Players.objects.get(name=player).ShoDist} , assists = {Players.objects.get(name=player).Assists}, goal creating actions - {Players.objects.get(name=player).GCA}, Dribbles completed successfully - {Players.objects.get(name=player).DriSucc}, dribbles past opponents - {Players.objects.get(name=player).DriPast}, nutmegs - {Players.objects.get(name=player).DriMegs}."
        else:
            stats = f"goals - {Players.objects.get(name=player).goals}, passes completed -{Players.objects.get(name=player).PasCmp}, total distanced passed {Players.objects.get(name=player).PasTotDist}, pass attempts - {Players.objects.get(name=player).PasTotAtt}, passes completed into 18yd box - {Players.objects.get(name=player).PPA}, tackles - {Players.objects.get(name=player).Tkl}, possesion winning tackles - {Players.objects.get(name=player).TklWon} , pressure on ball carrier - {Players.objects.get(name=player).Press}, times squad gained possesion upon pressure application - {Players.objects.get(name=player).PresSucc}, "

    elif('DF' in role):
        if('FW' in role):
            stats = f"tackles = {Players.objects.get(name=player).Tkl}, pass interceptions - {Players.objects.get(name=player).Int}, passes they blocked - {Players.objects.get(name=player).BlkPass}, touches in defensive 3rd - {Players.objects.get(name=player).TouDef3rd}, Mistakes made leading to opponent shot - {Players.objects.get(name=player).Err} , aerial duals won - {Players.objects.get(name=player).AerWon}, "
        else:
            stats = f"tackles = {Players.objects.get(name=player).Tkl}, pass interceptions - {Players.objects.get(name=player).Int}, passes they blocked - {Players.objects.get(name=player).BlkPass}, touches in defensive 3rd - {Players.objects.get(name=player).TouDef3rd}, Mistakes made leading to opponent shot - {Players.objects.get(name=player).Err} , aerial duals won - {Players.objects.get(name=player).AerWon}, goals - {Players.objects.get(name=player).goals}, goalpershot - {Players.objects.get(name=player).goalspersh} , shots on target - {Players.objects.get(name=player).sot}, percentage of shots on target{Players.objects.get(name=player).sotperc}, goals per shot - {Players.objects.get(name=player).goalspersh}, goals per shot on target - {Players.objects.get(name=player).goalspersot}, shots from free kicks - {Players.objects.get(name=player).ShoFK}, penaltie kicks made - {Players.objects.get(name=player).ShoPK}, distances of all shots made {Players.objects.get(name=player).ShoDist} , assists = {Players.objects.get(name=player).Assists}, goal creating actions - {Players.objects.get(name=player).GCA}, Dribbles completed successfully - {Players.objects.get(name=player).DriSucc}, dribbles past opponents - {Players.objects.get(name=player).DriPast}, nutmegs - {Players.objects.get(name=player).DriMegs}."
    elif('FW' in role):
        stats = f"goals - {Players.objects.get(name=player).goals}, goalpershot - {Players.objects.get(name=player).goalspersh} , shots on target - {Players.objects.get(name=player).sot}, percentage of shots on target{Players.objects.get(name=player).sotperc}, goals per shot - {Players.objects.get(name=player).goalspersh}, goals per shot on target - {Players.objects.get(name=player).goalspersot}, shots from free kicks - {Players.objects.get(name=player).ShoFK}, penaltie kicks made - {Players.objects.get(name=player).ShoPK}, distances of all shots made {Players.objects.get(name=player).ShoDist} , assists = {Players.objects.get(name=player).Assists}, goal creating actions - {Players.objects.get(name=player).GCA}, Dribbles completed successfully - {Players.objects.get(name=player).DriSucc}, dribbles past opponents - {Players.objects.get(name=player).DriPast}, nutmegs - {Players.objects.get(name=player).DriMegs}.  "

    total = base + stats + infractions + userstuff
    convo.append({"role":"user", "content": total})
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=convo
    )
    reply_content = completion.choices[0].message.content
    

    return reply_content



def Tone(player, text, opinion):
    convo = []
    total = f'Analyze the tone of this text: {text}'
    convo.append({"role":"user", "content": total})
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=convo
    )
    reply_content = completion.choices[0].message.content
    return reply_content

def Summary(player, text, opinion):
    convo = []
    total = f'Provide a summary of the given text: {text}'
    convo.append({"role":"user", "content": total})
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo", messages=convo
    )
    reply_content = completion.choices[0].message.content
    return reply_content




def beginbanter(player, text, user_input, aspect):
    if (aspect == 'Veracity'):
        convo =Veracity(player, text, user_input)
        # chatsetup()
        # finaldata = []

        # neededdata = chat(user_input)

        # ##now make a function that surfs for ##whatever## finds the needed data, lowers it and gets it from the dataframe, after which it inputs it into the chatgpt
        # finaldata = dataengage(neededdata, player)
        # finaldata = str(finaldata)
        # convo = chat(finaldata)
        # message_history = []
        return convo
    elif (aspect == 'Tone'):
        return(Tone(player, text, user_input))
    else:
        return(Summary(player, text, user_input))



def leagueupdates():
    data = {
        "leagues": [
            {
                "name": League.objects.get(code="PD").name,
                "top_scorer": League.objects.get(code="PD").topscorer,
                "top_team": League.objects.get(code="PD").topteam,
                "last_three_games": [
                    League.objects.get(code="PD").lastgame1,
                    League.objects.get(code="PD").lastgame2,
                    League.objects.get(code="PD").lastgame3,
                ],
                "next_three_games":[
                    League.objects.get(code="PD").nextgame1,
                    League.objects.get(code="PD").nextgame2,
                    League.objects.get(code="PD").nextgame3,
                ],
            },
            {
                "name": League.objects.get(code="PPL").name,
                "top_scorer": League.objects.get(code="PPL").topscorer,
                "top_team": League.objects.get(code="PPL").topteam,
                "last_three_games": [
                    League.objects.get(code="PPL").lastgame1,
                    League.objects.get(code="PPL").lastgame2,
                    League.objects.get(code="PPL").lastgame3,
                ],
                "next_three_games":[
                    League.objects.get(code="PPL").nextgame1,
                    League.objects.get(code="PPL").nextgame2,
                    League.objects.get(code="PPL").nextgame3,
                ],
            },
            {
                "name": League.objects.get(code="PL").name,
                "top_scorer": League.objects.get(code="PL").topscorer,
                "top_team": League.objects.get(code="PL").topteam,
                "last_three_games": [
                    League.objects.get(code="PL").lastgame1,
                    League.objects.get(code="PL").lastgame2,
                    League.objects.get(code="PL").lastgame3,
                ],
                  "next_three_games":[
                    League.objects.get(code="PL").nextgame1,
                    League.objects.get(code="PL").nextgame2,
                    League.objects.get(code="PL").nextgame3,
                ],
            },
            {
                "name": League.objects.get(code="BSA").name,
                "top_scorer": League.objects.get(code="BSA").topscorer,
                "top_team": League.objects.get(code="BSA").topteam,
                "last_three_games": [
                    League.objects.get(code="BSA").lastgame1,
                    League.objects.get(code="BSA").lastgame2,
                    League.objects.get(code="BSA").lastgame3,
                ],
                  "next_three_games":[
                    League.objects.get(code="BSA").nextgame1,
                    League.objects.get(code="BSA").nextgame2,
                    League.objects.get(code="BSA").nextgame3,
                ],
            },
            {
                "name": League.objects.get(code="ELC").name,
                "top_scorer": League.objects.get(code="ELC").topscorer,
                "top_team": League.objects.get(code="ELC").topteam,
                "last_three_games": [
                    League.objects.get(code="ELC").lastgame1,
                    League.objects.get(code="ELC").lastgame2,
                    League.objects.get(code="ELC").lastgame3,
                ],
                  "next_three_games":[
                    League.objects.get(code="ELC").nextgame1,
                    League.objects.get(code="ELC").nextgame2,
                    League.objects.get(code="ELC").nextgame3,
                ],
            },
            {
                "name": League.objects.get(code="BL1").name,
                "top_scorer": League.objects.get(code="BL1").topscorer,
                "top_team": League.objects.get(code="BL1").topteam,
                "last_three_games": [
                    League.objects.get(code="BL1").lastgame1,
                    League.objects.get(code="BL1").lastgame2,
                    League.objects.get(code="BL1").lastgame3,
                ],
                  "next_three_games":[
                    League.objects.get(code="BL1").nextgame1,
                    League.objects.get(code="BL1").nextgame2,
                    League.objects.get(code="BL1").nextgame3,
                ],
            },
        ]
    }

    return data


def playerlist(name):
    car = True
    person = get_object_or_404(Players, name=name)
    print('options are ')
    if (car):

        
        data = {
            "name": person.name,
            "nation": person.nation,
            "position": person.position,
            "squad": person.squad,
            "comp": person.comp,
            "age": person.age,
            "matchesplayed": person.matchesplayed,
            "starts": person.starts,
            "minutes": person.minutes,
            "goals": person.goals,
            "shots": person.shots,
            "sot": person.sot,
            "sotperc": person.sotperc,
            "goalspersh": person.goalspersh,
            "goalspersot": person.goalspersot,
            "ShoDist": person.ShoDist,
            "ShoFK": person.ShoFK,
            "ShoPK": person.ShoPK,
            "PKatt": person.PKatt,
            "PasTotCmp": person.PasTotCmp,
            "PasTotAtt": person.PasTotAtt,
            "PasTotCmpperc": person.PasTotCmpperc,
            "PasTotDist": person.PasTotDist,
            "PasTotPrgDist": person.PasTotPrgDist,
            "PasShoCmp": person.PasShoCmp,
            "PasShoAtt": person.PasShoAtt,
            "PasShoCmpperc": person.PasShoCmpperc,
            "PasMedCmp": person.PasMedCmp,
            "PasMedAtt": person.PasMedAtt,
            "PasMedCmpperc": person.PasMedCmpperc,
            "PasLonCmp": person.PasLonCmp,
            "PasLonAtt": person.PasLonAtt,
            "PasLonCmpperc": person.PasLonCmpperc,
            "Assists": person.Assists,
                "PasAss": person.PasAss,
                "Pas3rd": person.Pas3rd,
                "PPA": person.PPA,
                "CrsPA": person.CrsPA,
                "PasProg": person.PasProg,
                "PasAtt": person.PasAtt,
                "PasLive": person.PasLive,
                "PasDead": person.PasDead,
                "PasFK": person.PasFK,
                "TB": person.TB,
                "PasPress": person.PasPress,
                "Sw": person.Sw,
                "PasCrs": person.PasCrs,
                "CK": person.CK,
                "CkIn": person.CkIn,
                "CkOut": person.CkOut,
                "CkStr": person.CkStr,
                "PasGround": person.PasGround,
                "PasLow": person.PasLow,
                "PasHigh": person.PasHigh,
                "PaswLeft": person.PaswLeft,
                "PaswRight": person.PaswRight,
                "PaswHead": person.PaswHead,
                "TI": person.TI,
                "PaswOther": person.PaswOther,
                "PasCmp": person.PasCmp,
                "PasOff": person.PasOff,
                "PasOut": person.PasOut,
                "PasInt": person.PasInt,
                "PasBlocks": person.PasBlocks,
                "SCA": person.SCA,
                "ScaPassLive": person.ScaPassLive,
                "ScaPassDead": person.ScaPassDead,
                "ScaDrib": person.ScaDrib,
                "ScaSh": person.ScaSh,
                "ScaFld": person.ScaFld,
                "ScaDef": person.ScaDef,
                "GCA": person.GCA,
                "GcaPassLive": person.GcaPassLive,
                "GcaPassDead": person.GcaPassDead,
                "GcaDrib": person.GcaDrib,
                "GcaSh": person.GcaSh,
                "GcaFld": person.GcaFld,
                "GcaDef": person.GcaDef,
                "Tkl": person.Tkl,
                "TklWon": person.TklWon,
                "TklDef3rd": person.TklDef3rd,
                "TklMid3rd": person.TklMid3rd,
                "TklAtt3rd": person.TklAtt3rd,
                "TklDri": person.TklDri,
                "TklDriAtt": person.TklDriAtt,
                "TklDriperc": person.TklDriperc,
                "TklDriPast": person.TklDriPast,
                "Press": person.Press,
                "PresSucc": person.PresSucc,
                "Pressperc": person.Pressperc,
                "PresDef3rd": person.PresDef3rd,
                "PresMid3rd": person.PresMiad3rd,
                "PresAtt3rd": person.PresAtt3rd,
                "Blocks": person.Blocks,
                "BlkSh": person.BlkSh,
                "BlkShSv": person.BlkShSv,
                "BlkPass": person.BlkPass,
                "Int": person.Int,
                "TklplusInt": person.TklplusInt,
                "Clr": person.Clr,
                "Err": person.Err,
                "Touches": person.Touches,
                "TouDefPen": person.TouDefPen,
                "TouDef3rd": person.TouDef3rd,
                "TouMid3rd": person.TouMid3rd,
                "TouAtt3rd": person.TouAtt3rd,
                "TouAttPen": person.TouAttPen,
                "TouLive": person.TouLive,
                "DriSucc": person.DriSucc,
                "DriAtt": person.DriAtt,
                "DriSuccperc": person.DriSuccperc,
                "DriPast": person.DriPast,
                "DriMegs": person.DriMegs,
                "Carries": person.Carries,
                "CarTotDist": person.CarTotDist,
                "CarPrgDist": person.CarPrgDist,
                "CarProg": person.CarProg,
                "Car3rd": person.Car3rd,
                "CPA": person.CPA,
                "CarMis": person.CarMis,
                "CarDis": person.CarDis,
                "RecTarg": person.RecTarg,
                "Rec": person.Rec,
                "Recperc": person.Recperc,
                "RecProg": person.RecProg,
                "CrdY": person.CrdY,
                "CrdR": person.CrdR,
                "twoCrdY": person.twoCrdY,
                "Fls": person.Fls,
                "Fld": person.Fld,
                "Off": person.Off,
                "Crs": person.Crs,
                "TklW": person.TklW,
                "PKwon": person.PKwon,
                "PKcon": person.PKcon,
                "OG": person.OG,
                "Recov": person.Recov,
                "AerWon": person.AerWon,
                "AerLost": person.AerLost,
                "AerWonperc": person.AerWonperc,
            }
        return data
    else:
        Base = {
            "name": person.name,
            "nation": person.nation,
            "position": person.position,
            "squad": person.squad,
            "comp": person.comp,
            "age": person.age,
            "matchesplayed": person.matchesplayed,
            "starts": person.starts,
            "minutes": person.minutes
        }

        Goals = { "goals": person.goals,
            "shots": person.shots,
            "sot": person.sot,
            "sotperc": person.sotperc,
            "goalspersh": person.goalspersh,
            "goalspersot": person.goalspersot,
            "ShoDist": person.ShoDist,
            "ShoFK": person.ShoFK,
            "ShoPK": person.ShoPK,
            }
        
        Passes = {
            "PasAss": person.PasAss,
                "Pas3rd": person.Pas3rd,
                "PPA": person.PPA,
                "CrsPA": person.CrsPA,
                "PasProg": person.PasProg,
                "PasAtt": person.PasAtt,
                "PasLive": person.PasLive,
                "PasDead": person.PasDead,
                "PasFK": person.PasFK,
                "TB": person.TB,
                "PasPress": person.PasPress,
                "Sw": person.Sw,
                "PasCrs": person.PasCrs,
                "CK": person.CK,
                "CkIn": person.CkIn,
                "CkOut": person.CkOut,
                "CkStr": person.CkStr,
                "PasGround": person.PasGround,
                "PasLow": person.PasLow,
                "PasHigh": person.PasHigh,
                "PaswLeft": person.PaswLeft,
                "PaswRight": person.PaswRight,
                "PaswHead": person.PaswHead,
                "TI": person.TI,
                "PaswOther": person.PaswOther,
                "PasCmp": person.PasCmp,
                "PasOff": person.PasOff,
                "PasOut": person.PasOut,
                "PasInt": person.PasInt,
                "PasBlocks": person.PasBlocks,
        }
        GCA = {
            "SCA": person.SCA,
                "ScaPassLive": person.ScaPassLive,
                "ScaPassDead": person.ScaPassDead,
                "ScaDrib": person.ScaDrib,
                "ScaSh": person.ScaSh,
                "ScaFld": person.ScaFld,
                "ScaDef": person.ScaDef,
                "GCA": person.GCA,
                "GcaPassLive": person.GcaPassLive,
                "GcaPassDead": person.GcaPassDead,
                "GcaDrib": person.GcaDrib,
                "GcaSh": person.GcaSh,
                "GcaFld": person.GcaFld,
                "GcaDef": person.GcaDef,
        }

        Tackles = {
              "Tkl": person.Tkl,
                "TklWon": person.TklWon,
                "TklDef3rd": person.TklDef3rd,
                "TklMid3rd": person.TklMid3rd,
                "TklAtt3rd": person.TklAtt3rd,
                "TklDri": person.TklDri,
                "TklDriAtt": person.TklDriAtt,
                "TklDriperc": person.TklDriperc,
                "TklDriPast": person.TklDriPast,

        }
        Presses = {
            "Press": person.Press,
                "PresSucc": person.PresSucc,
                "Pressperc": person.Pressperc,
                "PresDef3rd": person.PresDef3rd,
                "PresMid3rd": person.PresMid3rd,
                "PresAtt3rd": person.PresAtt3rd,
        }

        Blocks = {
             "Blocks": person.Blocks,
                "BlkSh": person.BlkSh,
                "BlkShSv": person.BlkShSv,
                "BlkPass": person.BlkPass,
             
        }
        Interceptions = {
            "Int": person.Int,
            "TklplusInt": person.TklplusInt,
        }
        Touches = {
             "Touches": person.Touches,
                "TouDefPen": person.TouDefPen,
                "TouDef3rd": person.TouDef3rd,
                "TouMid3rd": person.TouMid3rd,
                "TouAtt3rd": person.TouAtt3rd,
                "TouAttPen": person.TouAttPen,
                "TouLive": person.TouLive,

        }
        Dribbles = {
            "DriSucc": person.DriSucc,
                "DriAtt": person.DriAtt,
                "DriSuccperc": person.DriSuccperc,
                "DriPast": person.DriPast,
                "DriMegs": person.DriMegs,
        }
        Carries = {
            "Carries": person.Carries,
                "CarTotDist": person.CarTotDist,
                "CarPrgDist": person.CarPrgDist,
                "CarProg": person.CarProg,
                "Car3rd": person.Car3rd,
                "CPA": person.CPA,
                "CarMis": person.CarMis,
                "CarDis": person.CarDis,

        }
        Receives = {
            "RecTarg": person.RecTarg,
            "Rec": person.Rec,
            "Recperc": person.Recperc,
            "RecProg": person.RecProg,
         }
        Infractions = {
            "CrdY": person.CrdY,
                "CrdR": person.CrdR,
                "twoCrdY": person.twoCrdY,
                "Fls": person.Fls,
                "Fld": person.Fld,
                "OG": person.OG,

        }
        Aerial = {
            "Recov": person.Recov,
            "AerWon": person.AerWon,
            "AerLost": person.AerLost,
            "AerWonperc": person.AerWonperc,

        }
        data = {"name": person.name,}
        if ("Base" in options):
            data.update(Base)
        if ("Goals" in options):
            data.update(Goals)
        if ("Passes" in options):
            data.update(Passes)
        if ("GCA" in options):
            data.update(GCA)
        if ("Tackles" in options):
            data.update(Tackles)
        if ("Presses" in options):
            data.update(Presses)
        if ("Blocks" in options):
            data.update(Blocks)
        if ("Interceptions" in options):
            data.update(Interceptions)
        if ("Touches" in options):
            data.update(Touches)
        if ("Dribbles" in options):
            data.update(Dribbles)
        if ("Carries" in options):
            data.update(Carries)
        if ("Receives" in options):
            data.update(Receives)
        if ("Infractions" in options):
            data.update(Infractions)
        if ("Aerial" in options):
            data.update(Aerial)
        keys =   (data.keys())
        vals = list(data.values())
        data.update({"keys": keys})
        

        return data
        
        


        
