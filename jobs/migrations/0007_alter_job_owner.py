<<<<<<< HEAD
# Generated by Django 4.0.5 on 2022-06-13 09:55
=======
# Generated by Django 4.0.5 on 2022-06-13 17:43
>>>>>>> Nicholas

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('jobs', '0006_alter_job_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='jobs', to=settings.AUTH_USER_MODEL),
        ),
    ]