from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework import status

from .models import Job
from jobs.serializers.common import JobSerializer 
from .serializers.populated import PopulatedJobsSerializer

from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

class JobListView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly, )

  def get(self, _request):
    jobs = Job.objects.all()
    serialized_jobs = JobSerializer(jobs, many=True)
    return Response(serialized_jobs.data, status.HTTP_200_OK)

  def post(self, request):
      permission_classes = (IsAuthenticated, )
      request.data['owner'] = request.user.id
      deserialized_job = JobSerializer(data=request.data)
      try:
        deserialized_job.is_valid(True)
        deserialized_job.save()
        return Response(deserialized_job.data, status.HTTP_201_CREATED)
      except Exception as e:
        print(e)
        return Response({ 'detail': str(e)}, status.HTTP_422_UNPROCESSABLE_ENTITY)


class JobDetailListView(APIView):
  # permission_classes = (IsAuthenticated, )

  def get_job(self, pk):
    try:
      return Job.objects.get(pk=pk)
    except Job.DoesNotExist as e:
      raise NotFound({ 'detail': str(e) })

  def get(self, _request, pk):
    job = Job.objects.get(pk=pk)
    serialized_job = PopulatedJobsSerializer(job)
    return Response(serialized_job.data, status.HTTP_200_OK)

  def delete(self, request, pk):
    job_to_delete = self.get_job(pk)
    if job_to_delete.owner != request.user:
            print('WE CANT DELETE JOB')
            raise PermissionDenied()
    job_to_delete.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

  def put(self, request, pk):
    job_to_update = self.get_job(pk=pk)
    if job_to_update.owner != request.user:
            print('WE CANT UPDATE JOB')
            raise PermissionDenied()
    # job_to_update.data['owner'] = request.user.id
    deserialized_job = JobSerializer(job_to_update, request.data)
    try:
      deserialized_job.is_valid(True)
      deserialized_job.save()
      return Response(deserialized_job.data, status.HTTP_202_ACCEPTED)
    except Exception as e:
      return Response({ 'detail': str(e)}, status.HTTP_422_UNPROCESSABLE_ENTITY)

