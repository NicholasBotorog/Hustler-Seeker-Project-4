from django.urls import path 
from .views import APIView, RegisterView, LoginView, UserView, LoggedUserView

urlpatterns = [
  path('register/', RegisterView.as_view()),
  path('login/', LoginView.as_view() ),
  path('user/', LoggedUserView.as_view()),
  path('user/<int:pk>/', UserView.as_view())
]