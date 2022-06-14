from .common import TagSerializer
from jobs.serializers.common import JobSerializer

class PopulatedTagsSerializer(TagSerializer):
  jobs = JobSerializer(many = True)