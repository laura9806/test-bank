from django.urls import path
from apps.Accounts.views import *

urlpatterns = [
    path('user_accounts/',user_accounts, name='user_accounts'),
    path('consign/',consign, name='consign'),
    path('withdraw/',withdraw, name='withdraw'),
    path('check_balance/',check_balance, name='check_balance'),
    path('create_account/',create_account, name='create_account'),
    path('get_status/', get_status, name='status'),
    path('get_types/', get_types, name='types'),
]
