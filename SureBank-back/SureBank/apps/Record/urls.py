from django.urls import path
from .views import *

urlpatterns = [
    path('get_movement_record/',get_movement_history, name='get_movement_record'),
]
