from ...models import League
import requests
from datetime import datetime

def convert_to_american_time(date_string):
    # Parse the input string using the datetime.strptime() function
    datetime_obj = datetime.strptime(date_string, '%Y-%m-%dT%H:%M:%S')

    # Convert the datetime object to American standard time format
    american_time = datetime_obj.strftime('%m/%d/%Y %I:%M:%S %p')

    return american_time

def getheaders():
    return({ 'X-Auth-Token': '6dd5e1a622b94f9ea343129adb8b6506' })


def updatescorer():
    headers = getheaders()
    tags = ['BSA', 'ELC', 'PL', 'FL1', 'BL1', 'SA', 'DED', 'PPL', 'PD']
    print('job1')


    for tag in tags:
        uri = f"http://api.football-data.org/v4/competitions/{tag}/scorers"
        response = requests.get(uri, headers = headers)
        jdata = response.json()
        player = jdata['scorers'][0]['player']['name']
        team = jdata['scorers'][0]['team']['name']
        team = team.upper()
        goals =  jdata['scorers'][0]['goals']
        assists =  jdata['scorers'][0]['assists']
        penalties =  jdata['scorers'][0]['penalties']
        total = f"{player}[{team}] {goals}G/{assists}A/{penalties}P"

        League.objects.filter(code=tag).update(topscorer=total)

    pass




def updateteam():
    headers = getheaders()
    tags = ['BSA', 'ELC', 'PL', 'FL1', 'BL1', 'SA', 'DED', 'PPL', 'PD']
    print('job2')

    for tag in tags:
        uri = f'http://api.football-data.org/v4/competitions/{tag}/standings'
        response = requests.get(uri, headers = headers)
        jdata = response.json()
        team = jdata['standings'][0]['table'][0]['team']['name']
        wins = jdata['standings'][0]['table'][0]['won']
        losses = jdata['standings'][0]['table'][0]['lost']
        draws = jdata['standings'][0]['table'][0]['draw']
        total = f"{team} {wins}W/{losses}L/{draws}D"

        League.objects.filter(code=tag).update(topteam=total)
    pass


def updatelastgames():
    headers = getheaders()
    tags = ['BSA', 'ELC', 'PL', 'FL1', 'BL1', 'SA', 'DED', 'PPL', 'PD']
    print('job3')
    for tag in tags:
        uri = f'http://api.football-data.org/v4/competitions/{tag}/matches?status=FINISHED'
        response = requests.get(uri, headers = headers)
        jdata = response.json()
        side = None
        for i in range(3):
            if(jdata['matches'][(i+1)*-1]['score']['winner'] == 'HOME_TEAM'):
                team = jdata['matches'][(i+1)*-1]['homeTeam']['name']
            elif(jdata['matches'][(i+1)*-1]['score']['winner'] == 'AWAY_TEAM'):
                team = jdata['matches'][(i+1)*-1]['awayTeam']['name']
            elif(jdata['matches'][(i+1)*-1]['score']['winner'] == 'DRAW'):
                side = 'draw'
            else:
                side = 'NA'
            if (i == 0):
                if (side == 'draw'):
                    League.objects.filter(code=tag).update(lastgame1=f"{jdata['matches'][(i+1)*-1]['homeTeam']['name']} vs {jdata['matches'][(i+1)*-1]['awayTeam']['name']} [DRAW] ")
                elif(side == 'NA'):
                    League.objects.filter(code=tag).update(lastgame1='NA')
                else:
                    League.objects.filter(code=tag).update(lastgame1=f"{jdata['matches'][(i+1)*-1]['homeTeam']['name']} vs {jdata['matches'][(i+1)*-1]['awayTeam']['name']} [winner: {team}] ")
            if (i == 1):
                if (side == 'draw'):
                    League.objects.filter(code=tag).update(lastgame2=f"{jdata['matches'][(i+1)*-1]['homeTeam']['name']} vs {jdata['matches'][(i+1)*-1]['awayTeam']['name']} [DRAW] ")
                elif(side == 'NA'):
                    League.objects.filter(code=tag).update(lastgame2='NA')
                else:
                    League.objects.filter(code=tag).update(lastgame2=f"{jdata['matches'][(i+1)*-1]['homeTeam']['name']} vs {jdata['matches'][(i+1)*-1]['awayTeam']['name']} [winner: {team}] ")
            if (i == 2):
                if (side == 'draw'):
                    League.objects.filter(code=tag).update(lastgame3=f"{jdata['matches'][(i+1)*-1]['homeTeam']['name']} vs {jdata['matches'][(i+1)*-1]['awayTeam']['name']} [DRAW] ")
                elif(side == 'NA'):
                    League.objects.filter(code=tag).update(lastgame3='NA')
                else:
                    League.objects.filter(code=tag).update(lastgame3=f"{jdata['matches'][(i+1)*-1]['homeTeam']['name']} vs {jdata['matches'][(i+1)*-1]['awayTeam']['name']} [winner: {team}] ")
    pass


def updatenextgames():
    headers = getheaders()
    tags = ['BSA', 'ELC', 'PL', 'FL1', 'BL1', 'SA', 'DED', 'PPL', 'PD']
    print("job4")

    for tag in tags:
        uri = f'http://api.football-data.org/v4/competitions/{tag}/matches?status=SCHEDULED'
        response = requests.get(uri, headers = headers)
        jdata = response.json()
        for i in range(3):
            if i == 0:
                try:
                    home = jdata['matches'][0]['homeTeam']['name']
                    away = jdata['matches'][0]['awayTeam']['name']
                    time = jdata['matches'][0]['utcDate']
                    time = time.replace("Z", "")
                    time = convert_to_american_time(time)
                    total = f'{home} vs {away} at {time}'
                    League.objects.filter(code=tag).update(nextgame1= total)
                except:
                    League.objects.filter(code=tag).update(nextgame1= 'No more matches')
            elif i == 1:
                try:
                    home = jdata['matches'][1]['homeTeam']['name']
                    away = jdata['matches'][1]['awayTeam']['name']
                    time = jdata['matches'][1]['utcDate']
                    time = time.replace("Z", "")
                    time = convert_to_american_time(time)
                    total = f'{home} vs {away} at {time}'
                    League.objects.filter(code=tag).update(nextgame2= total)
                except:
                    League.objects.filter(code=tag).update(nextgame2 = "No more matches")
            elif i == 2:
                try:
                    home = jdata['matches'][2]['homeTeam']['name']
                    away = jdata['matches'][2]['awayTeam']['name']
                    time = jdata['matches'][2]['utcDate']
                    time = time.replace("Z", "")
                    time = convert_to_american_time(time)
                    total = f'{home} vs {away} at {time}'
                    League.objects.filter(code=tag).update(nextgame3= total)
                except:
                    League.objects.filter(code=tag).update(nextgame3 = "No more matches")



            # if (i == 0):
            #     if (side == 'draw'):
            #         League.objects.filter(code=tag).update(lastgame1=f"{jdata['matches'][i]['homeTeam']['name']} vs {jdata['matches'][i]['awayTeam']['name']} [DRAW] ")
            #     elif(side == 'NA'):
            #         League.objects.filter(code=tag).update(lastgame1='NA')
            #     else:
            #         League.objects.filter(code=tag).update(lastgame1=f"{jdata['matches'][i]['homeTeam']['name']} vs {jdata['matches'][i]['awayTeam']['name']} [winner: {team}] ")
            # if (i == 1):
            #     if (side == 'draw'):
            #         League.objects.filter(code=tag).update(lastgame2=f"{jdata['matches'][i]['homeTeam']['name']} vs {jdata['matches'][i]['awayTeam']['name']} [DRAW] ")
            #     elif(side == 'NA'):
            #         League.objects.filter(code=tag).update(lastgame2='NA')
            #     else:
            #         League.objects.filter(code=tag).update(lastgame2=f"{jdata['matches'][i]['homeTeam']['name']} vs {jdata['matches'][i]['awayTeam']['name']} [winner: {team}] ")
            # if (i == 2):
            #     if (side == 'draw'):
            #         League.objects.filter(code=tag).update(lastgame3=f"{jdata['matches'][i]['homeTeam']['name']} vs {jdata['matches'][i]['awayTeam']['name']} [DRAW] ")
            #     elif(side == 'NA'):
            #         League.objects.filter(code=tag).update(lastgame3='NA')
            #     else:
            #         League.objects.filter(code=tag).update(lastgame3=f"{jdata['matches'][i]['homeTeam']['name']} vs {jdata['matches'][i]['awayTeam']['name']} [winner: {team}] ")
    pass



        
        