from rest_framework import serializers
from ..models import Application

class AplicationSerializer(serializers.ModelSerializer):
  class Meta:
    model = Application
    fields = '__all__'