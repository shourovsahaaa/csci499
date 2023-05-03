# Generated by Django 4.2 on 2023-04-24 01:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='players',
            name='AerLost',
            field=models.FloatField(null=True, verbose_name='AerLost'),
        ),
        migrations.AddField(
            model_name='players',
            name='AerWon',
            field=models.FloatField(null=True, verbose_name='AerWon'),
        ),
        migrations.AddField(
            model_name='players',
            name='AerWonperc',
            field=models.FloatField(null=True, verbose_name='AerWon%'),
        ),
        migrations.AddField(
            model_name='players',
            name='Assists',
            field=models.FloatField(null=True, verbose_name='Assists'),
        ),
        migrations.AddField(
            model_name='players',
            name='BlkPass',
            field=models.FloatField(null=True, verbose_name='BlkPass'),
        ),
        migrations.AddField(
            model_name='players',
            name='BlkSh',
            field=models.FloatField(null=True, verbose_name='BlkSh'),
        ),
        migrations.AddField(
            model_name='players',
            name='BlkShSv',
            field=models.FloatField(null=True, verbose_name='BlkShSv'),
        ),
        migrations.AddField(
            model_name='players',
            name='Blocks',
            field=models.FloatField(null=True, verbose_name='Blocks'),
        ),
        migrations.AddField(
            model_name='players',
            name='CK',
            field=models.FloatField(null=True, verbose_name='CK'),
        ),
        migrations.AddField(
            model_name='players',
            name='CPA',
            field=models.FloatField(null=True, verbose_name='CPA'),
        ),
        migrations.AddField(
            model_name='players',
            name='Car3rd',
            field=models.FloatField(null=True, verbose_name='Car3rd'),
        ),
        migrations.AddField(
            model_name='players',
            name='CarDis',
            field=models.FloatField(null=True, verbose_name='CarDis'),
        ),
        migrations.AddField(
            model_name='players',
            name='CarMis',
            field=models.FloatField(null=True, verbose_name='CarMis'),
        ),
        migrations.AddField(
            model_name='players',
            name='CarPrgDist',
            field=models.FloatField(null=True, verbose_name='CarPrgDist'),
        ),
        migrations.AddField(
            model_name='players',
            name='CarProg',
            field=models.FloatField(null=True, verbose_name='CarProg'),
        ),
        migrations.AddField(
            model_name='players',
            name='CarTotDist',
            field=models.FloatField(null=True, verbose_name='CarTotDist'),
        ),
        migrations.AddField(
            model_name='players',
            name='Carries',
            field=models.FloatField(null=True, verbose_name='Carries'),
        ),
        migrations.AddField(
            model_name='players',
            name='CkIn',
            field=models.FloatField(null=True, verbose_name='CkIn'),
        ),
        migrations.AddField(
            model_name='players',
            name='CkOut',
            field=models.FloatField(null=True, verbose_name='CkOut'),
        ),
        migrations.AddField(
            model_name='players',
            name='CkStr',
            field=models.FloatField(null=True, verbose_name='CkStr'),
        ),
        migrations.AddField(
            model_name='players',
            name='Clr',
            field=models.FloatField(null=True, verbose_name='Clr'),
        ),
        migrations.AddField(
            model_name='players',
            name='CrdR',
            field=models.FloatField(null=True, verbose_name='CrdR'),
        ),
        migrations.AddField(
            model_name='players',
            name='CrdY',
            field=models.FloatField(null=True, verbose_name='CrdY'),
        ),
        migrations.AddField(
            model_name='players',
            name='Crs',
            field=models.FloatField(null=True, verbose_name='Crs'),
        ),
        migrations.AddField(
            model_name='players',
            name='CrsPA',
            field=models.FloatField(null=True, verbose_name='CrsPA'),
        ),
        migrations.AddField(
            model_name='players',
            name='DriAtt',
            field=models.FloatField(null=True, verbose_name='DriAtt'),
        ),
        migrations.AddField(
            model_name='players',
            name='DriMegs',
            field=models.FloatField(null=True, verbose_name='DriMegs'),
        ),
        migrations.AddField(
            model_name='players',
            name='DriPast',
            field=models.FloatField(null=True, verbose_name='DriPast'),
        ),
        migrations.AddField(
            model_name='players',
            name='DriSucc',
            field=models.FloatField(null=True, verbose_name='DriSucc'),
        ),
        migrations.AddField(
            model_name='players',
            name='DriSuccperc',
            field=models.FloatField(null=True, verbose_name='DriSucc%'),
        ),
        migrations.AddField(
            model_name='players',
            name='Err',
            field=models.FloatField(null=True, verbose_name='Err'),
        ),
        migrations.AddField(
            model_name='players',
            name='Fld',
            field=models.FloatField(null=True, verbose_name='Fld'),
        ),
        migrations.AddField(
            model_name='players',
            name='Fls',
            field=models.FloatField(null=True, verbose_name='Fls'),
        ),
        migrations.AddField(
            model_name='players',
            name='GCA',
            field=models.FloatField(null=True, verbose_name='GCA'),
        ),
        migrations.AddField(
            model_name='players',
            name='GcaDef',
            field=models.FloatField(null=True, verbose_name='GcaDef'),
        ),
        migrations.AddField(
            model_name='players',
            name='GcaDrib',
            field=models.FloatField(null=True, verbose_name='GcaDrib'),
        ),
        migrations.AddField(
            model_name='players',
            name='GcaFld',
            field=models.FloatField(null=True, verbose_name='GcaFld'),
        ),
        migrations.AddField(
            model_name='players',
            name='GcaPassDead',
            field=models.FloatField(null=True, verbose_name='GcaPassDead'),
        ),
        migrations.AddField(
            model_name='players',
            name='GcaPassLive',
            field=models.FloatField(null=True, verbose_name='GcaPassLive'),
        ),
        migrations.AddField(
            model_name='players',
            name='GcaSh',
            field=models.FloatField(null=True, verbose_name='GcaSh'),
        ),
        migrations.AddField(
            model_name='players',
            name='Int',
            field=models.FloatField(null=True, verbose_name='Int'),
        ),
        migrations.AddField(
            model_name='players',
            name='OG',
            field=models.FloatField(null=True, verbose_name='OG'),
        ),
        migrations.AddField(
            model_name='players',
            name='Off',
            field=models.FloatField(null=True, verbose_name='Off'),
        ),
        migrations.AddField(
            model_name='players',
            name='PKatt',
            field=models.FloatField(null=True, verbose_name='PKatt'),
        ),
        migrations.AddField(
            model_name='players',
            name='PKcon',
            field=models.FloatField(null=True, verbose_name='PKcon'),
        ),
        migrations.AddField(
            model_name='players',
            name='PKwon',
            field=models.FloatField(null=True, verbose_name='PKwon'),
        ),
        migrations.AddField(
            model_name='players',
            name='PPA',
            field=models.FloatField(null=True, verbose_name='PPA'),
        ),
        migrations.AddField(
            model_name='players',
            name='Pas3rd',
            field=models.FloatField(null=True, verbose_name='Pas3rd'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasAss',
            field=models.FloatField(null=True, verbose_name='PasAss'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasAtt',
            field=models.FloatField(null=True, verbose_name='PasAtt'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasBlocks',
            field=models.FloatField(null=True, verbose_name='PasBlocks'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasCmp',
            field=models.FloatField(null=True, verbose_name='PasCmp'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasCrs',
            field=models.FloatField(null=True, verbose_name='PasCrs'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasDead',
            field=models.FloatField(null=True, verbose_name='PasDead'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasFK',
            field=models.FloatField(null=True, verbose_name='PasFK'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasGround',
            field=models.FloatField(null=True, verbose_name='PasGround'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasHigh',
            field=models.FloatField(null=True, verbose_name='PasHigh'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasInt',
            field=models.FloatField(null=True, verbose_name='PasInt'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasLive',
            field=models.FloatField(null=True, verbose_name='PasLive'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasLonAtt',
            field=models.FloatField(null=True, verbose_name='PasLonAtt'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasLonCmp',
            field=models.FloatField(null=True, verbose_name='PasLonCmp'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasLonCmpperc',
            field=models.FloatField(null=True, verbose_name='PasLonCmp%'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasLow',
            field=models.FloatField(null=True, verbose_name='PasLow'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasMedAtt',
            field=models.FloatField(null=True, verbose_name='PasMedAtt'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasMedCmp',
            field=models.FloatField(null=True, verbose_name='PasMedCmp'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasMedCmpperc',
            field=models.FloatField(null=True, verbose_name='PasMedCmp%'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasOff',
            field=models.FloatField(null=True, verbose_name='PasOff'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasOut',
            field=models.FloatField(null=True, verbose_name='PasOut'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasPress',
            field=models.FloatField(null=True, verbose_name='PasPress'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasProg',
            field=models.FloatField(null=True, verbose_name='PasProg'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasShoAtt',
            field=models.FloatField(null=True, verbose_name='PasShoAtt'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasShoCmp',
            field=models.FloatField(null=True, verbose_name='PasShoCmp'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasShoCmpperc',
            field=models.FloatField(null=True, verbose_name='PasShoCmp%'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasTotAtt',
            field=models.FloatField(null=True, verbose_name='PasTotAtt'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasTotCmp',
            field=models.FloatField(null=True, verbose_name='PasTotCmp'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasTotCmpperc',
            field=models.FloatField(null=True, verbose_name='PasTotCmp%'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasTotDist',
            field=models.FloatField(null=True, verbose_name='PasTotDist'),
        ),
        migrations.AddField(
            model_name='players',
            name='PasTotPrgDist',
            field=models.FloatField(null=True, verbose_name='PasTotPrgDist'),
        ),
        migrations.AddField(
            model_name='players',
            name='PaswHead',
            field=models.FloatField(null=True, verbose_name='PaswHead'),
        ),
        migrations.AddField(
            model_name='players',
            name='PaswLeft',
            field=models.FloatField(null=True, verbose_name='PaswLeft'),
        ),
        migrations.AddField(
            model_name='players',
            name='PaswOther',
            field=models.FloatField(null=True, verbose_name='PaswOther'),
        ),
        migrations.AddField(
            model_name='players',
            name='PaswRight',
            field=models.FloatField(null=True, verbose_name='PaswRight'),
        ),
        migrations.AddField(
            model_name='players',
            name='PresAtt3rd',
            field=models.FloatField(null=True, verbose_name='PresAtt3rd'),
        ),
        migrations.AddField(
            model_name='players',
            name='PresDef3rd',
            field=models.FloatField(null=True, verbose_name='PresDef3rd'),
        ),
        migrations.AddField(
            model_name='players',
            name='PresMid3rd',
            field=models.FloatField(null=True, verbose_name='PresMid3rd'),
        ),
        migrations.AddField(
            model_name='players',
            name='PresSucc',
            field=models.FloatField(null=True, verbose_name='PresSucc'),
        ),
        migrations.AddField(
            model_name='players',
            name='Press',
            field=models.FloatField(null=True, verbose_name='Press'),
        ),
        migrations.AddField(
            model_name='players',
            name='Pressperc',
            field=models.FloatField(null=True, verbose_name='Press%'),
        ),
        migrations.AddField(
            model_name='players',
            name='Rec',
            field=models.FloatField(null=True, verbose_name='Rec'),
        ),
        migrations.AddField(
            model_name='players',
            name='RecProg',
            field=models.FloatField(null=True, verbose_name='RecProg'),
        ),
        migrations.AddField(
            model_name='players',
            name='RecTarg',
            field=models.FloatField(null=True, verbose_name='RecTarg'),
        ),
        migrations.AddField(
            model_name='players',
            name='Recov',
            field=models.FloatField(null=True, verbose_name='Recov'),
        ),
        migrations.AddField(
            model_name='players',
            name='Recperc',
            field=models.FloatField(null=True, verbose_name='Rec%'),
        ),
        migrations.AddField(
            model_name='players',
            name='SCA',
            field=models.FloatField(null=True, verbose_name='SCA'),
        ),
        migrations.AddField(
            model_name='players',
            name='ScaDef',
            field=models.FloatField(null=True, verbose_name='ScaDef'),
        ),
        migrations.AddField(
            model_name='players',
            name='ScaDrib',
            field=models.FloatField(null=True, verbose_name='ScaDrib'),
        ),
        migrations.AddField(
            model_name='players',
            name='ScaFld',
            field=models.FloatField(null=True, verbose_name='ScaFld'),
        ),
        migrations.AddField(
            model_name='players',
            name='ScaPassDead',
            field=models.FloatField(null=True, verbose_name='ScaPassDead'),
        ),
        migrations.AddField(
            model_name='players',
            name='ScaPassLive',
            field=models.FloatField(null=True, verbose_name='ScaPassLive'),
        ),
        migrations.AddField(
            model_name='players',
            name='ScaSh',
            field=models.FloatField(null=True, verbose_name='ScaSh'),
        ),
        migrations.AddField(
            model_name='players',
            name='ShoDist',
            field=models.FloatField(null=True, verbose_name='ShoDist'),
        ),
        migrations.AddField(
            model_name='players',
            name='ShoFK',
            field=models.FloatField(null=True, verbose_name='ShoFK'),
        ),
        migrations.AddField(
            model_name='players',
            name='ShoPK',
            field=models.FloatField(null=True, verbose_name='ShoPK'),
        ),
        migrations.AddField(
            model_name='players',
            name='Sw',
            field=models.FloatField(null=True, verbose_name='Sw'),
        ),
        migrations.AddField(
            model_name='players',
            name='TB',
            field=models.FloatField(null=True, verbose_name='TB'),
        ),
        migrations.AddField(
            model_name='players',
            name='TI',
            field=models.FloatField(null=True, verbose_name='TI'),
        ),
        migrations.AddField(
            model_name='players',
            name='Tkl',
            field=models.FloatField(null=True, verbose_name='Tkl'),
        ),
        migrations.AddField(
            model_name='players',
            name='TklAtt3rd',
            field=models.FloatField(null=True, verbose_name='TklAtt3rd'),
        ),
        migrations.AddField(
            model_name='players',
            name='TklDef3rd',
            field=models.FloatField(null=True, verbose_name='TklDef3rd'),
        ),
        migrations.AddField(
            model_name='players',
            name='TklDri',
            field=models.FloatField(null=True, verbose_name='TklDri'),
        ),
        migrations.AddField(
            model_name='players',
            name='TklDriAtt',
            field=models.FloatField(null=True, verbose_name='TklDriAtt'),
        ),
        migrations.AddField(
            model_name='players',
            name='TklDriPast',
            field=models.FloatField(null=True, verbose_name='TklDriPast'),
        ),
        migrations.AddField(
            model_name='players',
            name='TklDriperc',
            field=models.FloatField(null=True, verbose_name='TklDri%'),
        ),
        migrations.AddField(
            model_name='players',
            name='TklMid3rd',
            field=models.FloatField(null=True, verbose_name='TklMid3rd'),
        ),
        migrations.AddField(
            model_name='players',
            name='TklW',
            field=models.FloatField(null=True, verbose_name='TklW'),
        ),
        migrations.AddField(
            model_name='players',
            name='TklWon',
            field=models.FloatField(null=True, verbose_name='TklWon'),
        ),
        migrations.AddField(
            model_name='players',
            name='TklplusInt',
            field=models.FloatField(null=True, verbose_name='Tkl+Int'),
        ),
        migrations.AddField(
            model_name='players',
            name='TouAtt3rd',
            field=models.FloatField(null=True, verbose_name='TouAtt3rd'),
        ),
        migrations.AddField(
            model_name='players',
            name='TouAttPen',
            field=models.FloatField(null=True, verbose_name='TouAttPen'),
        ),
        migrations.AddField(
            model_name='players',
            name='TouDef3rd',
            field=models.FloatField(null=True, verbose_name='TouDef3rd'),
        ),
        migrations.AddField(
            model_name='players',
            name='TouDefPen',
            field=models.FloatField(null=True, verbose_name='TouDefPen'),
        ),
        migrations.AddField(
            model_name='players',
            name='TouLive',
            field=models.FloatField(null=True, verbose_name='TouLive'),
        ),
        migrations.AddField(
            model_name='players',
            name='TouMid3rd',
            field=models.FloatField(null=True, verbose_name='TouMid3rd'),
        ),
        migrations.AddField(
            model_name='players',
            name='Touches',
            field=models.FloatField(null=True, verbose_name='Touches'),
        ),
        migrations.AddField(
            model_name='players',
            name='age',
            field=models.IntegerField(null=True, verbose_name='Age'),
        ),
        migrations.AddField(
            model_name='players',
            name='twoCrdY',
            field=models.FloatField(null=True, verbose_name='2CrdY'),
        ),
        migrations.AlterField(
            model_name='players',
            name='comp',
            field=models.CharField(max_length=30, verbose_name='Comp'),
        ),
        migrations.AlterField(
            model_name='players',
            name='goals',
            field=models.FloatField(null=True, verbose_name='Goals'),
        ),
        migrations.AlterField(
            model_name='players',
            name='goalspersh',
            field=models.FloatField(null=True, verbose_name='G/Sh'),
        ),
        migrations.AlterField(
            model_name='players',
            name='goalspersot',
            field=models.FloatField(null=True, verbose_name='G/SoT'),
        ),
        migrations.AlterField(
            model_name='players',
            name='matchesplayed',
            field=models.IntegerField(null=True, verbose_name='MP'),
        ),
        migrations.AlterField(
            model_name='players',
            name='minutes',
            field=models.IntegerField(null=True, verbose_name='Min'),
        ),
        migrations.AlterField(
            model_name='players',
            name='name',
            field=models.CharField(max_length=30, verbose_name='Player'),
        ),
        migrations.AlterField(
            model_name='players',
            name='nation',
            field=models.CharField(max_length=30, verbose_name='Nation'),
        ),
        migrations.AlterField(
            model_name='players',
            name='position',
            field=models.CharField(max_length=30, verbose_name='Pos'),
        ),
        migrations.AlterField(
            model_name='players',
            name='shots',
            field=models.FloatField(null=True, verbose_name='Shots'),
        ),
        migrations.AlterField(
            model_name='players',
            name='sot',
            field=models.FloatField(null=True, verbose_name='SoT'),
        ),
        migrations.AlterField(
            model_name='players',
            name='sotperc',
            field=models.FloatField(null=True, verbose_name='Sot%'),
        ),
        migrations.AlterField(
            model_name='players',
            name='squad',
            field=models.CharField(max_length=30, verbose_name='Squad'),
        ),
        migrations.AlterField(
            model_name='players',
            name='starts',
            field=models.IntegerField(null=True, verbose_name='Starts'),
        ),
    ]