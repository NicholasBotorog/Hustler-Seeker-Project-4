from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status 
from rest_framework.exceptions import PermissionDenied, ValidationError
from datetime import datetime, timedelta
from django.conf import settings
from rest_framework.permissions import IsAuthenticated

import jwt
from .serializers.common import UserSerializer

from django.contrib.auth import get_user_model
User = get_user_model()


class RegisterView(APIView):
  def post (self, request):
    user_to_add = UserSerializer(data=request.data)
    try:
      user_to_add.is_valid(True)
      user_to_add.save()
      return Response({ 'message': 'Registration Successful' }, status.HTTP_202_ACCEPTED)
    
    except ValidationError:
      return Response(user_to_add.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
    except Exception as e:
      print(e)
      return Response({ 'detail': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)


class LoginView(APIView):
  def post(self, request):
    email = request.data.get('email')
    password = request.data.get('password')
    try:
      user_to_validate = User.objects.get(email=email)
    except User.DoesNotExist:
      raise PermissionDenied('Invalid Credentials')

    if not user_to_validate.check_password(password):
      raise PermissionDenied('Invalid Credentials')

    dt = datetime.now() + timedelta(days=14)


    token = jwt.encode(
      {
        'sub': user_to_validate.id,
        'exp': int(dt.strftime('%s'))
      },
      settings.SECRET_KEY,
      algorithm = 'HS256'
    )

    return Response({ 'message': f'Welcome Back, {user_to_validate.username}', 'token': token }, status.HTTP_202_ACCEPTED)


class UserView(APIView):
  
    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise PermissionDenied(detail="Invalid Credentials")

    def get(self, _request, pk):
        user = self.get_user(pk=pk)
        serialized_user = UserSerializer(user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)


class LoggedUserView(APIView):
  permission_classes = (IsAuthenticated, )

  def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise PermissionDenied(detail="Invalid Credentials")

  def get(self, request):
        user = self.get_user(pk=request.user.id)
        serialized_user = UserSerializer(user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)

  def put (self, request, pk): 
    user_to_edit = self.get_user(pk, request.user.id)
    deserialized_user= UserSerializer(user_to_edit, data=request.data)
    try:
      deserialized_user.is_valid(True)
      deserialized_user.save()
      return Response(deserialized_user.data, status.HTTP_202_ACCEPTED)
    except Exception as e:
      return Response({ 'error' : str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)

  def delete(self, request,pk):
    user_to_delete = self.get_user(pk, request.user.id)
    user_to_delete.delete()
    return Response(status = status.HTTP_204_NO_CONTENT)