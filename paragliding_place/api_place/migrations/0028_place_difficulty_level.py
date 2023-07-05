# Generated by Django 4.1.8 on 2023-07-02 13:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_place', '0027_alter_comments_place_comment'),
    ]

    operations = [
        migrations.AddField(
            model_name='place',
            name='difficulty_level',
            field=models.CharField(choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D')], default='', max_length=3),
        ),
    ]
