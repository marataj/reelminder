from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend

class EmailBackend(ModelBackend):
    """
    Custom backend for authentication. Enables authentication using
    email address instead of username. Before authentication attempt
    email's letters are changed to lowercase.
    
    """
    def authenticate(self, request, username=None, password=None, **kwargs):
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(email=username.lower())
        except UserModel.DoesNotExist:
            return None
        else:
            if user.check_password(password):
                return user
        return None