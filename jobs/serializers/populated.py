from .common import JobSerializer
from tags.serializers.common import TagSerializer
from reviews.serializers.populated import PopulatedReviewSerializer

class PopulatedJobsSerializer(JobSerializer):
  tags = TagSerializer(many=True)
  reviews = PopulatedReviewSerializer(many = True)

