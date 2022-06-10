from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .serializers.common import ReviewSerializer
from .models import Review

# Create your views here.
class ReviewListView(APIView):
    # permission_classes = (IsAuthenticated, )

    def post(self, request):
        user = request.user
        request.data['owner'] = request.user.id
        review_to_add = ReviewSerializer(data=request.data)
        try:
            review_to_add.is_valid(True)
            review_to_add.save()
            return Response(review_to_add.data, status.HTTP_201_CREATED)
        except ValidationError:
            return Response(review_to_add.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            print(e)
            return Response({ 'detail': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)

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
        