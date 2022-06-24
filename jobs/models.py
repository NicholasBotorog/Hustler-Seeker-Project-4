from django.db import models

# Create your models here.

class Job(models.Model):
  title = models.CharField(max_length=50, default = None)
  company = models.CharField(max_length=50, default = None)
  salary = models.IntegerField(default=None)
  still_open = models.BooleanField(default = True)
  description = models.TextField(default = None)
  job_location = models.CharField(max_length = 50, default = None)
  logo = models.CharField(max_length = 300, blank=True)
  display_message = models.CharField(max_length = 500, default = None)
  job_type = models.CharField(max_length=50, blank=True)
  created_at=models.DateField(auto_now_add=True)
  website = models.CharField(max_length = 300, blank=True)
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
