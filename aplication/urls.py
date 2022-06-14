from django.urls import path
from .views import ApplicationDetailView, ApplicationListView

urlpatterns=[
  path('', ApplicationListView.as_view()),
  path('<int:pk>/', ApplicationDetailView.as_view())
]