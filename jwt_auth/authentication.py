from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import PermissionDenied 
from django.contrib.auth import get_user_model
from django.conf import settings 
User = get_user_model()

import jwt 

class JWTAuthentication(BaseAuthentication):

  def authenticate(self, request):

    header = request.headers.get('Authorization') 

    if not header:
      return None

    if not header.startswith('Bearer'):
      raise PermissionDenied(detail="Auth token is invalid")

    token = header.replace('Bearer ', '')

    try:
      payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])

      user = User.objects.get(pk=payload.get('sub'))

    except jwt.exceptions.InvalidTokenError:
      raise PermissionDenied(detail="Invalid Token")

    except User.DoesNotExist:
      raise PermissionDenied(detail="User Not Found")

    return (user, token)
