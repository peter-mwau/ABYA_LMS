# Generated by Django 5.0 on 2024-06-26 07:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('assignments', '0002_quiz_teacher'),
    ]

    operations = [
        migrations.RenameField(
            model_name='question',
            old_name='quiz_title',
            new_name='quiz',
        ),
    ]