from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework import status

from .models import Job
from jobs.serializers.common import JobSerializer 
from .serializers.populated import PopulatedJobsSerializer


class JobListView(APIView):

  def get(self, _request):
    jobs = Job.objects.all()
    serialized_jobs = JobSerializer(jobs, many=True)
    return Response(serialized_jobs.data, status.HTTP_200_OK)

  def post(self, request):
      deserialized_job = JobSerializer(data=request.data)
      try:
        deserialized_job.is_valid(True)
        deserialized_job.save()
        return Response(deserialized_job.data, status.HTTP_201_CREATED)
      except Exception as e:
        print(e)
        return Response({ 'detail': str(e)}, status.HTTP_422_UNPROCESSABLE_ENTITY)


class JobDetailListView(APIView):

  def get_job(self, pk):
    try:
      return Job.objects.get(pk=pk)
    except Job.DoesNotExist as e:
      raise NotFound({ 'detail': str(e) })

  def get(self, _request, pk):
    job = self.get_job(pk)
    serialized_job = PopulatedJobsSerializer(job)
    return Response(serialized_job.data, status.HTTP_200_OK)

  def delete(self, _request, pk):
    job_to_delete = self.get_job(pk)
    job_to_delete.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

  def put(self, request, pk):
    job_to_update = self.get_job(pk=pk)
    deserialized_job = JobSerializer(job_to_update, request.data)
    try:
      deserialized_job.is_valid()
      deserialized_job.save()
      return Response(deserialized_job.data, status.HTTP_202_ACCEPTED)
    except Exception as e:
      return Response({ 'detail': str(e)}, status.HTTP_422_UNPROCESSABLE_ENTITY)

