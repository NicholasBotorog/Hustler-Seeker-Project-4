from django.db import models

# Create your models here.
class Application(models.Model):
  job=models.ForeignKey(
    "jobs.Job",
    related_name="aplication",
    on_delete=models.CASCADE
  )
  applied = models.BooleanField(default=True)
  owner = models.ForeignKey(
    'jwt_auth.User',
    related_name="aplication",
    on_delete=models.CASCADE
  )

