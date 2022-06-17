from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .serializers.common import ReviewSerializer
from .serializers.populated import PopulatedReviewSerializer
from .models import Review

from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

# Create your views here.
class ReviewListView(APIView):
  permission_classes = (IsAuthenticated, )

  def get(self, _request):
    reviews = Review.objects.all()
    serialized_reviews = PopulatedReviewSerializer(reviews, many=True)
    return Response(serialized_reviews.data, status=status.HTTP_200_OK)

  def post(self, request):
    request.data['owner'] = request.user.id
    review_to_add = ReviewSerializer(data=request.data)
    if review_to_add.is_valid():
      review_to_add.save()
      return Response(review_to_add.data, status.HTTP_201_CREATED)
    return Response(review_to_add.errors, status.HTTP_422_UNPROCESSABLE_ENTITY) 

class ReviewDetailView(APIView):
    permission_classes = (IsAuthenticated, )

    def get_review(self, pk):
        try:
            return Review.objects.get(pk=pk)
        except Review.DoesNotExist:
            raise NotFound("Review not found")

    def delete(self, request, pk):
        user = request.user
        review_to_delete = self.get_review(pk)
        if review_to_delete.owner != request.user:
            raise PermissionDenied()
        review_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        