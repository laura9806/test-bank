from django.db import models
from django.contrib.auth.models import User

class Status(models.Model):
    description = models.CharField(max_length=255)

    def __str__(self):
        return self.description

class Types(models.Model):
    description = models.CharField(max_length=255)

    def __str__(self):
        return self.description

class Account(models.Model):
    account_number = models.IntegerField()
    password = models.CharField(max_length=100)
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.ForeignKey(Status, on_delete=models.CASCADE)
    type = models.ForeignKey(Types, on_delete=models.CASCADE)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    creation_date = models.DateTimeField()
