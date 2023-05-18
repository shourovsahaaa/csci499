from django.core.management.base import BaseCommand
from apscheduler.schedulers.blocking import BlockingScheduler
from datetime import datetime, timedelta
from api.management.commands.jobs import updatescorer, updateteam, updatelastgames, updatenextgames
from django.utils import timezone

class Command(BaseCommand):
    help = 'Runs the APScheduler'

    def handle(self, *args, **options):
        scheduler = BlockingScheduler()

        # Schedule the jobs to run every 10 minutes in a cycle
        scheduler.add_job(updatescorer, 'interval', minutes = 10 , id='job1')
        scheduler.add_job(updateteam, 'interval', minutes=10, id='job2')
        scheduler.add_job(updatelastgames, 'interval', minutes=10, id='job3')
        scheduler.add_job(updatenextgames, 'interval', minutes=10, id='job4')


        now = datetime.now()
        now = timezone.make_aware(now, timezone.get_default_timezone())
        scheduler.get_job('job4').next_run_time = now.replace(second=0, microsecond=0) + timedelta(minutes=1)
        scheduler.get_job('job3').next_run_time = now.replace(second=0, microsecond=0) + timedelta(minutes=4)
        scheduler.get_job('job2').next_run_time = now.replace(second=0, microsecond=0) + timedelta(minutes=7)
        scheduler.get_job('job1').next_run_time = now.replace(second=0, microsecond=0) + timedelta(minutes=10)


        # Start the scheduler
        scheduler.start()
