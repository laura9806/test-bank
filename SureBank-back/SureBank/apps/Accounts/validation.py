def validate_create_account(data):
    required_fields = ['balance', 'password', 'confirmPassword', 'type_id', 'status_id']
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return ', '.join(missing_fields) + ' are required parameters'

    if not data['password'].isdigit():
        return 'Password must be numeric'

    if data['password'] != data['confirmPassword']:
        return 'Passwords do not match'

    try:
        balance = float(data['balance'])
        if balance < 0:
            return 'The initial balance cannot be less than zero'
    except ValueError:
        return 'The opening balance must be a number'

    return None


def validate_consign_withdraw(data):
    required_fields = ['account_number', 'amount', 'password']
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return ', '.join(missing_fields) + ' are required parameters'
    try:
        value = float(data['amount'])
        if value <= 0:
            return 'The value must be greater than zero'
    except ValueError:
        return 'The value must be a number'

    return None


