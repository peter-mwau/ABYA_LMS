# Generated by Django 5.0 on 2024-08-02 11:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assignments', '0005_alter_question_quiz_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='quizsubmission',
            name='fail_count',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='quizsubmission',
            name='last_failed',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
