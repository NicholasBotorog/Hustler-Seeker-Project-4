from .common import JobSerializer
from tags.serializers.common import TagSerializer

class PopulatedJobsSerializer(JobSerializer):
  tags = TagSerializer(many=True)

