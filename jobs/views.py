from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 

from .models import Job
from .serializers.common import JobSerializer

class JobListView(APIView):

  def get(self, _request):
    jobs = Job.objects.all()
    serialized_jobs = JobSerializer(jobs, many=True)
    return Response(serialized_jobs.data, status.HTTP_200_OK)

  def post(self, request):
    return Response()