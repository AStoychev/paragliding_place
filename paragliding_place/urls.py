from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include([
        path('auth/', include('paragliding_place.api_auth.urls')),
        path('place', include('paragliding_place.api_place.urls')),
    ]))
]
