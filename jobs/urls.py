from django.urls import path 
from .views import JobListView, JobDetailListView

urlpatterns = [
  path('', JobListView.as_view()),
  path('<int:pk>/', JobDetailListView.as_view())
]