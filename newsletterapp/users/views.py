# rest framework
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        try:
            # delete the token if already exists
            token = Token.objects.get(user=user)
            token.delete()
        except Token.DoesNotExist:
            pass
        token = Token.objects.create(user=user)
        return Response({
            'token': token.key,
            'user': user.username
        })

