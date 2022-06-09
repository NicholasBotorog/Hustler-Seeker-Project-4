from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers.populated import PopulatedTagsSerializer
from .models import Tag


# Create your views here.

class TagListView(APIView):

  def get(self, _request):
    tags = Tag.objects.all()
    serialized_tags = PopulatedTagsSerializer(tags, many=True)
    return Response(serialized_tags.data, status.HTTP_200_OK)
