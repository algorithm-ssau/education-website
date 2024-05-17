from .models import User

class UserBackend:
    def authenticate(self, request, email=None, password=None):
        try:
            # Попытка найти пользователя по имени пользователя и проверить пароль
            user = User.objects.get(email=email)
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            # Если пользователь не найден, возвращаем None
            return None

    def get_user(self, user_id):
        try:
            # Получаем пользователя по его идентификатору
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            # Если пользователь не найден, возвращаем None
            return None