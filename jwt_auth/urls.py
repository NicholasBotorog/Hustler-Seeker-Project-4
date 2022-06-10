from django.urls import path 
from .views import APIView, RegisterView, LoginView, RetriveUSerView

urlpatterns = [
  path('register/', RegisterView.as_view()),
  path('login/', LoginView.as_view() ),
  path('user/', RetriveUSerView.as_view())
]