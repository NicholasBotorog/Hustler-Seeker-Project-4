from .common import JobSerializer
from tags.serializers.common import TagSerializer
from reviews.serializers.populated import PopulatedReviewSerializer
from jwt_auth.serializers.common import UserSerializer

class PopulatedJobsSerializer(JobSerializer):
  tags = TagSerializer(many=True)
  reviews = PopulatedReviewSerializer(many = True)
  owner=UserSerializer()

