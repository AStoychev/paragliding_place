from django.contrib.auth import get_user_model, authenticate, login
from rest_framework.authtoken.models import Token

from rest_framework import generics as rest_generic_views, views as rest_views, status
from rest_framework.authtoken import views as authtoken_views
from rest_framework.authtoken import models as authtoken_models
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from paragliding_place.api_auth.serializers import CreateUserSerializer, DetailsUserSerializer, UserUpdateSerializer, \
    ChangePasswordSerializer

UserModel = get_user_model()


class RegisterApiView(rest_generic_views.CreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = CreateUserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        token, created = Token.objects.get_or_create(user=serializer.instance)
        return Response({
            'token': token.key,
            'user_id': serializer.instance.id,
            'username': serializer.instance.username,
            'email': serializer.instance.email},
            status=status.HTTP_201_CREATED,
            headers=headers)


class LoginApiView(authtoken_views.ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = authtoken_models.Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            # It is not good idea password to be here
            # 'password': user.password,
            'user_id': user.pk,
            'username': user.username,
            # 'age': user.age,
            # You can use this when email filed is in register page
            'email': user.email
        })


class LogoutApiView(rest_views.APIView):
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [TokenAuthentication]
    # authentication_classes = ""
    # authentication_classes = [RemoteUserAuthentication]
    # authentication_classes = [SessionAuthentication]

    def get(self, request):
        return self.__perform_logout(request)

    def post(self, request):
        return self.__perform_logout(request)

    @staticmethod
    def __perform_logout(request):
        request.user.auth_token.delete()
        # request.user.auth_token.delete()
        return Response({
            'message': 'user logged out'
        })


class ChangePasswordView(rest_generic_views.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    model = UserModel
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)

            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()

            response = {
                'status': 'success',
                'code': 'status.HTTP_200_OK',
                'message': 'Password update successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListDetailsUser(rest_generic_views.ListAPIView):
    queryset = UserModel.objects.all()
    list_serializer_class = DetailsUserSerializer

    def get_serializer_class(self):
        return self.list_serializer_class

    def get(self, request, *args, **kwargs):
        try:
            id = request.query_params["id"]
            if id != None:
                user = UserModel.objects.get(id=id)
                serializer = DetailsUserSerializer(user)
        except:
            users = self.get_queryset()
            serializer = DetailsUserSerializer(users, many=True)

        # return Response(DetailsUserSerializer(self.list_serializer_class, many=True).data)
        return Response(serializer.data)


class UpdateProfileApiView(rest_generic_views.UpdateAPIView):
    queryset = UserModel.objects.all()
    list_serializer_class = UserUpdateSerializer

    def get_serializer_class(self):
        return self.list_serializer_class
