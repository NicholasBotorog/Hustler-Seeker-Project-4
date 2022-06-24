from django.contrib import admin
from django.urls import path, include, re_path # <-- added this new import re_path
from .views import index # <-- also new

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('jwt_auth.urls')),
    path('api/jobs/', include('jobs.urls')),
    path('api/tags/', include('tags.urls')),
    path('api/reviews/', include('reviews.urls')),
    path('api/aplication/', include('aplication.urls')),
    re_path(r'^.*$', index)
]
