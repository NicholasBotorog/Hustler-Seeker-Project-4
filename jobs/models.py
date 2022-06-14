from django.db import models

# Create your models here.

class Job(models.Model):
  title = models.CharField(max_length=50, default = None)
  company = models.CharField(max_length=50, default = None)
  salary = models.IntegerField(default=None)
  still_open = models.BooleanField(default = True)
  description = models.TextField(default = None)
  job_location = models.CharField(max_length = 50, default = None)
  tags = models.ManyToManyField(
    'tags.Tag',
    related_name = 'jobs'
  )
  owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='jobs',
        on_delete=models.CASCADE
    )


  def __str__(self):
    return f'{self.company} is looking for a {self.title} (${self.salary} / year)'