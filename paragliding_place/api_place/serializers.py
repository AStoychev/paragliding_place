from rest_framework import serializers

from paragliding_place.api_place.models import Place, Comments, Rating


class PlaceForListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Place
        fields = ('id', 'place', 'description_launch', 'description_landing', 'direction', 'latitude_takes_off', 'longitude_takes_off',
                  'latitude_landing', 'longitude_landing', 'difficulty_level', 'user_id')


class PlaceForCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        # fields = ('place', 'url_meteo', 'direction', 'latitude_takes_off', 'longitude_takes_off',
        #           'latitude_landing', 'longitude_landing', 'description')
        # Remove id from first position
        fields = ('id', 'place', 'description_launch', 'description_landing', 'direction', 'latitude_takes_off',
                  'longitude_takes_off', 'latitude_landing', 'longitude_landing', 'difficulty_level', 'user_id')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class PlaceUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ('id', 'place', 'description_launch', 'description_landing', 'direction', 'latitude_takes_off',
                  'longitude_takes_off', 'latitude_landing', 'longitude_landing', 'difficulty_level')

    def update(self, instance, validated_data):
        instance.place = validated_data.get('place', instance.place)
        instance.description_launch = validated_data.get('description_launch', instance.description_launch)
        instance.description_landing = validated_data.get('description_landing', instance.description_landing)
        instance.direction = validated_data.get('direction', instance.direction)
        instance.latitude_takes_off = validated_data.get('latitude_takes_off', instance.latitude_takes_off)
        instance.longitude_takes_off = validated_data.get('longitude_takes_off', instance.longitude_takes_off)
        instance.latitude_landing = validated_data.get('latitude_landing', instance.latitude_landing)
        instance.longitude_landing = validated_data.get('longitude_landing', instance.longitude_landing)
        instance.difficulty_level = validated_data.get('difficulty_level', instance.difficulty_level)
        instance.save()
        return instance


class PlaceDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ('id', 'place', 'description_launch', 'description_landing', 'direction', 'latitude_takes_off',
                  'longitude_takes_off', 'latitude_landing', 'longitude_landing', 'difficulty_level')


class CommentForListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ('id', 'text', 'place_comment', 'user_id', 'owner')


class CommentForCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ('id', 'text', 'place_comment', 'user_id', 'owner')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class CommentUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ('id', 'text', 'place_comment', 'user_id', 'owner')

    def update(self, instance, validated_data):
        instance.text = validated_data.get('text', instance.text)
        instance.place_comment = validated_data.get('place_comment', instance.place_comment)
        instance.user_id = validated_data.get('user_id', instance.user_id)
        instance.owner = validated_data.get('owner', instance.owner)
        instance.save()
        return instance


class CommentDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__'


class RatingForListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('id', 'rating', 'owner', 'place_id_rating', 'user_id')


class RatingForCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('id', 'rating', 'owner', 'place_id_rating', 'user_id')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
