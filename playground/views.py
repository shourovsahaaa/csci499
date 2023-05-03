from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
#upon a request returns a response
#action

def calculate():
    x = 1
    y = 2
    return (x + y)

def say_hello(request):
    #could so alot
    #pull data from db
    #send emails
    #yadda yada
    #return HttpResponse("Hello World!")#httpresponse allows it to actually be parsed?

    x = calculate()
    y = 2
    return render(request, "hello.html", {'name': 'obi'})
