# Generated by Django 5.0 on 2023-12-10 09:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tracker', '0005_remove_tracker_createdat_remove_tracker_updatedat_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='tracker',
            name='title',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
    ]