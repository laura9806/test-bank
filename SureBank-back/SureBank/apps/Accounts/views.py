from django.views.decorators.csrf import csrf_exempt
from django.db import transaction, IntegrityError
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from .models import Account
from apps.Record.models import Record
from .validation import *
import random
from datetime import datetime
from decimal import Decimal
from django.http import JsonResponse
from .models import Status, Types


@api_view(['GET'])
def user_accounts(request):
    user = request.user
    if user.is_authenticated:
        accounts = Account.objects.filter(user=user)
        account_data = [{'account_number': account.account_number, 'balance': account.balance} for account in accounts]
        return JsonResponse({'accounts': account_data})
    else:
        return JsonResponse({'error': 'User is not authenticated'}, status=401)

@api_view(['POST'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt
def create_account(request):
    user = request.user
    if request.method == 'POST':
        data = request.POST
        error = validate_create_account(data)
        if error:
            return JsonResponse({'error': error}, status=400)

        account_number = generate_unique_account_number()
        date = get_current_date()
        # Encriptar la contraseña antes de guardarla
        encrypted_password = make_password(data['password'])
        account = Account(
            account_number=account_number,
            balance=data['balance'],
            user_id=user.id,
            status_id=data['status_id'],
            creation_date=date,
            password=encrypted_password,
            type_id=data['type_id'],
        )

        with transaction.atomic():
            account.save()
            record(4, account.id, account.balance)
        return JsonResponse({'message': 'Account created successfully'})


@api_view(['POST'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt
def consign(request):
    user = request.user
    if user.is_authenticated:
        if request.method == 'POST':
            data = request.POST
            error = validate_consign_withdraw(data)
            if error:
                return JsonResponse({'error': error}, status=400)
            try:
                account = Account.objects.get(account_number=data['account_number'], user=user)
            except Account.DoesNotExist:
                return JsonResponse({'error': 'The account does not exist'}, status=404)

            if not check_password(data['password'], account.password):
                return JsonResponse({'error': 'Invalid password'}, status=400)

            if account.status_id != 1:
                return JsonResponse({'error': 'Account is not in the required state for consignment'}, status=400)

            account.balance += Decimal(data['amount'])

            with transaction.atomic():
                try:
                    account.save()
                    record(3, account.id, Decimal(data['amount']))
                except IntegrityError:
                    return JsonResponse({'error': 'Database integrity error'}, status=500)

            return JsonResponse({'message': 'Successful consignment'})
    else:
        return JsonResponse({'error': 'User is not authenticated'}, status=401)


@api_view(['POST'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
@csrf_exempt
def withdraw(request):
    user = request.user
    if user.is_authenticated:
        if request.method == 'POST':
            data = request.POST
            error = validate_consign_withdraw(data)
            if error:
                return JsonResponse({'error': error}, status=400)
            try:
                account = Account.objects.get(account_number=data['account_number'], user=user)
                if account.balance < Decimal(data['amount']):
                    return JsonResponse({'error': 'Insufficient balance'}, status=400)
            except Account.DoesNotExist:
                return JsonResponse({'error': 'The account does not exist'}, status=404)

            if not check_password(data['password'], account.password):
                return JsonResponse({'error': 'Invalid password'}, status=400)

            if account.status_id != 1:
                return JsonResponse({'error': 'Account is not in the required state for consignment'}, status=400)

            account.balance -= Decimal(data['amount'])

            with transaction.atomic():
                try:
                    account.save()
                    record(2, account.id, Decimal(data['amount']))
                except IntegrityError:
                    return JsonResponse({'error': 'Database integrity error'}, status=500)

            return JsonResponse({'message': 'Successful withdraw'})
    else:
        return JsonResponse({'error': 'User is not authenticated'}, status=401)

def generate_unique_account_number():
    account_number = random.randint(10000000, 99999999)
    if Account.objects.filter(account_number=account_number).exists():
        return generate_unique_account_number()
    return account_number

@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def check_balance(request):
    user = request.user
    if user.is_authenticated:
        if request.method == 'GET':
            account_number = request.GET.get('account_number')
            try:
                account = Account.objects.get(account_number=account_number, user=user)
                record(1, account.id, account.balance)
                return JsonResponse({'Balance': account.balance})
            except Account.DoesNotExist:
                return JsonResponse({'error': 'the account does not exist'}, status=404)
        else:
            return JsonResponse({'error': 'Disallowed method'}, status=405)
    else:
        return JsonResponse({'error': 'User is not authenticated'}, status=401)


def record(movement, account, amount):
    record = Record.objects.create(
        movement_type_id=movement,
        date=get_current_date(),
        account_id=account,
        amount=amount,
    )


def get_current_date():
    return datetime.now()



def get_status(request):
    statuses = Status.objects.all().values('id', 'description')
    return JsonResponse({'status': list(statuses)})

def get_types(request):
    types = Types.objects.all().values('id', 'description')
    return JsonResponse({'types': list(types)})





