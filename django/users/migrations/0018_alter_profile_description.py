# Generated by Django 5.1.3 on 2024-11-15 12:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0017_alter_profile_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='description',
            field=models.CharField(default='Ashe: The Frost Archer, an archer with ice arrows and a hawk scout.'),
        ),
    ]