from django.contrib import admin

from paragliding_place.api_auth.models import AppUser


@admin.register(AppUser)
class PlaceAdmin(admin.ModelAdmin):
    pass
