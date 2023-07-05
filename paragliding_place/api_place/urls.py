from django.urls import path

from paragliding_place.api_place.views import ListCreatePlaceApiView, UpdatePlaceApiView, DeletePlaceApiView, \
    ListCommentPlaceApiView, DeleteCommentApiView, UpdateCommentApiView, ListCreateRatingPlaceApiView

urlpatterns = (
    path('', ListCreatePlaceApiView.as_view(), name='api list place'),
    path('/<int:pk>', UpdatePlaceApiView.as_view(), name='api update place'),
    path('/delete/<int:pk>', DeletePlaceApiView.as_view(), name='api delete place'),
    path('/comment', ListCommentPlaceApiView.as_view(), name='api comment place list'),
    path('/comment/edit/<int:pk>', UpdateCommentApiView.as_view(), name='api edit comment'),
    path('/comment/delete/<int:pk>', DeleteCommentApiView.as_view(), name='api delete comment'),
    path('/rating', ListCreateRatingPlaceApiView.as_view(), name='api list create rating')
    # path('/comment', CreateCommentPlaceApiView.as_view(), name='api comment place create'),
    # path('<int:pk>', ForecastPlaceApiView.as_view(), name='api forecast place'),
)