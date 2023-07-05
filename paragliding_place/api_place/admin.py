from django.contrib import admin

from paragliding_place.api_place.models import Place, Comments


@admin.register(Place)
class PlaceAdmin(admin.ModelAdmin):
    pass


@admin.register(Comments)
class CommentAdmin(admin.ModelAdmin):
    pass
