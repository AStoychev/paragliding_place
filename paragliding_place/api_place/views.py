from rest_framework import generics as rest_generic_views

from paragliding_place.api_place.models import Place, Comments, Rating

from paragliding_place.api_place.serializers import PlaceForListSerializer, PlaceForCreateSerializer, \
    PlaceUpdateSerializer, PlaceDeleteSerializer, CommentForListSerializer, CommentForCreateSerializer, \
    CommentDeleteSerializer, CommentUpdateSerializer, RatingForListSerializer, RatingForCreateSerializer


class ListCreatePlaceApiView(rest_generic_views.ListCreateAPIView):
    queryset = Place.objects.all()

    create_serializer_class = PlaceForCreateSerializer
    list_serializer_class = PlaceForListSerializer

    # permission_classes = (
    #     permissions.IsAuthenticated,
    # )

    def get_serializer_class(self):
        if self.request.method == "GET":
            return self.list_serializer_class
        return self.create_serializer_class


class UpdatePlaceApiView(rest_generic_views.RetrieveUpdateAPIView):
    queryset = Place.objects.all()

    update_serializer_class = PlaceUpdateSerializer
    list_serializer_class = PlaceForListSerializer

    def get_serializer_class(self):
        if self.request.method == "GET":
            return self.list_serializer_class
        return self.update_serializer_class


class DeletePlaceApiView(rest_generic_views.RetrieveDestroyAPIView):
    queryset = Place.objects.all()

    delete_serializer_class = PlaceDeleteSerializer
    list_serializer_class = PlaceForListSerializer

    def get_serializer_class(self):
        if self.request.method == "GET":
            return self.list_serializer_class
        return self.delete_serializer_class


class ListCommentPlaceApiView(rest_generic_views.ListCreateAPIView):
    queryset = Comments.objects.all()

    list_comment_serializer_class = CommentForListSerializer
    create_comment_serializer_class = CommentForCreateSerializer

    def get_serializer_class(self):
        if self.request.method == "GET":
            return self.list_comment_serializer_class
        return self.create_comment_serializer_class


class UpdateCommentApiView(rest_generic_views.RetrieveUpdateAPIView):
    queryset = Comments.objects.all()

    list_comment_serializer_class = CommentForListSerializer
    update_comment_serializer_class = CommentUpdateSerializer

    def get_serializer_class(self):
        if self.request.method == "GET":
            return self.list_comment_serializer_class
        return self.update_comment_serializer_class


class DeleteCommentApiView(rest_generic_views.RetrieveDestroyAPIView):
    queryset = Comments.objects.all()

    list_comment_serializer_class = CommentForListSerializer
    delete_comment_serializer_class = CommentDeleteSerializer

    def get_serializer_class(self):
        if self.request.method == "GET":
            return self.list_comment_serializer_class
        return self.delete_comment_serializer_class


class ListCreateRatingPlaceApiView(rest_generic_views.ListCreateAPIView):
    queryset = Rating.objects.all()

    list_rating_serializer_class = RatingForListSerializer
    create_rating_serializer_class = RatingForCreateSerializer

    def get_serializer_class(self):
        if self.request.method == "GET":
            return self.list_rating_serializer_class
        return self.create_rating_serializer_class

