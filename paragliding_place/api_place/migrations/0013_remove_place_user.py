# Generated by Django 4.1.8 on 2023-04-29 05:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api_place', '0012_alter_place_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='place',
            name='user',
        ),
    ]
