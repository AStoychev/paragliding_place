# Generated by Django 4.1.8 on 2023-05-03 07:31

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_place', '0017_alter_place_direction'),
    ]

    operations = [
        migrations.AlterField(
            model_name='place',
            name='direction',
            field=django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=30, null=True), size=30), size=30),
        ),
    ]
