from django.urls import path, include

from paragliding_place.api_auth.views import RegisterApiView, LoginApiView, LogoutApiView, ListDetailsUser, \
    UpdateProfileApiView, ChangePasswordView

urlpatterns = (
    path('register', RegisterApiView.as_view(), name='api register user'),
    path('login', LoginApiView.as_view(), name='api login user'),
    path('logout', LogoutApiView.as_view(), name='api logout user'),
    path('profile', ListDetailsUser.as_view(), name='api details user'),
    path('profile/edit/<int:pk>', UpdateProfileApiView.as_view(), name='api update user profile'),
    path('profile/edit/change-password/<int:pk>', ChangePasswordView.as_view(), name='profile change password'),
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
)
