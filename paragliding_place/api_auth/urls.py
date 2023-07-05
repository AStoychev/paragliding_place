from django.urls import path

from paragliding_place.api_auth.views import RegisterApiView, LoginApiView, LogoutApiView, ListDetailsUser

urlpatterns = (
    path('register', RegisterApiView.as_view(), name='api register user'),
    path('login', LoginApiView.as_view(), name='api login user'),
    path('logout', LogoutApiView.as_view(), name='api logout user'),
    path('profile', ListDetailsUser.as_view(), name='api details user'),
)
