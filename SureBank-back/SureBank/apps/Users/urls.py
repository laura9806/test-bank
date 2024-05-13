from django.urls import path
from .views import UserRegister, UserLogin, obtain_jwt_token_view
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token


urlpatterns = [
    path('api/token/', obtain_jwt_token),
    path('api/register/', UserRegister.as_view()),
    path('api/login/', obtain_jwt_token_view),
    path('api-token-auth/', obtain_jwt_token),
    path('api-token-refresh/', refresh_jwt_token),
    path('api-token-verify/', verify_jwt_token),

]
