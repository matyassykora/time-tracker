# Generated by Django 5.0 on 2023-12-08 10:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tracker', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tracker',
            name='createdAt',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='tracker',
            name='updatedAt',
            field=models.IntegerField(),
        ),
    ]
