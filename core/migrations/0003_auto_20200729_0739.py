# Generated by Django 3.0.6 on 2020-07-29 07:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20200729_0736'),
    ]

    operations = [
        migrations.AlterField(
            model_name='solutions',
            name='video',
            field=models.FileField(upload_to='solution-videos/'),
        ),
    ]
