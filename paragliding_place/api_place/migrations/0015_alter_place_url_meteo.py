# Generated by Django 4.1.8 on 2023-04-30 15:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_place', '0014_place_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='place',
            name='url_meteo',
            field=models.URLField(default='', max_length=500),
        ),
    ]
