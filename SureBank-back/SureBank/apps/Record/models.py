from django.db import models
from apps.Accounts.models import Account

class Movement_type(models.Model):
    description = models.CharField(max_length=255)

    def __str__(self):
        return self.description

class Record(models.Model):
    date = models.DateTimeField()
    amount = models.IntegerField()
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    movement_type = models.ForeignKey(Movement_type, on_delete=models.CASCADE)
