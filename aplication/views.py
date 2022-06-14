from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .models import Application
from .serializers.common import AplicationSerializer

class ApplicationListView(APIView):
  permission_classes = (IsAuthenticated, )

  def post(self, request):
    request.data['owner'] = request.user.id
    aplication_to_add = AplicationSerializer(data=request.data)
    if aplication_to_add.is_valid():
      aplication_to_add.save()
      return Response(aplication_to_add.data, status.HTTP_201_CREATED)
    return Response(aplication_to_add.errors, status.HTTP_422_UNPROCESSABLE_ENTITY) 


class ApplicationDetailView(APIView):
  permission_classes = (IsAuthenticated, ) 

  def get_application(self, pk):
    try:
      application = Application.objects.get(pk=pk)
      return application 
    except Application.DoesNotExist:
      raise NotFound(detail="Not Found")

  def delete(self, request, pk) :
    aplication_to_delete = self.get_application(pk=pk)
    if aplication_to_delete.owner != request.user:
      raise PermissionDenied(detail="Unauthorised!")
    aplication_to_delete.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)