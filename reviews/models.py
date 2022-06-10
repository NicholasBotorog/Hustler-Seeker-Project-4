from django.db import models

# Create your models here.
class Review(models.Model):
  text = models.CharField(max_length=300)
  created_at=models.DateField(auto_now_add=True)
  job = models.ForeignKey(
    'jobs.Job',
    related_name="reviews",
    on_delete=models.CASCADE
  )
  owner = models.ForeignKey(
    'jwt_auth.User',
    related_name='reviews',
    on_delete=models.CASCADE
  )