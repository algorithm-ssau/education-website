from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
from .forms import SignUpForm
from rest_framework_simplejwt.tokens import RefreshToken

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            email = form.cleaned_data.get('email')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(email=email, password=raw_password)
            login(request, user)
            
            # Генерация JWT-токена
            refresh = RefreshToken.for_user(user)
            # Отправка токенов в ответ на успешную регистрацию
            return render(request, 'registration/signup_success.html', {'refresh': str(refresh), 'access': str(refresh.access_token)})  
            
    else:
        form = SignUpForm()
    return render(request, 'registration/signup.html', {'form': form})