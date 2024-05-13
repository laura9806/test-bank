from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from .models import Account
from apps.Record.models import Record
from django.http import JsonResponse


@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def get_movement_history(request):
    user = request.user
    if user.is_authenticated:
        if request.method == 'GET':
            account_number = request.GET.get('account_number')
            if account_number:
                try:
                    account = Account.objects.get(account_number=account_number, user=user)
                    records = Record.objects.filter(account__account_number=account_number)

                    movement_history = []
                    for record in records:
                        movement_history.append({
                            'date': record.date,
                            'movement_type': record.movement_type.description,
                            'amount': record.amount
                        })

                    return JsonResponse({'movement_history': movement_history})
                except Account.DoesNotExist:
                    return JsonResponse({'error': 'The account does not exist'}, status=404)
                except Record.DoesNotExist:
                    return JsonResponse({'error': 'No records found for the given account number'}, status=404)
            else:
                return JsonResponse({'error': 'Account number is required'}, status=400)
        else:
            return JsonResponse({'error': 'Disallowed method'}, status=405)
    else:
        return JsonResponse({'error': 'User is not authenticated'}, status=401)
