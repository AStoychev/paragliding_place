from django.contrib.auth import password_validation, get_user_model
from django.core import exceptions
from rest_framework import serializers

from django_countries.serializer_fields import CountryField

UserModel = get_user_model()


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('username', 'email', 'age', 'password')

    # This hashes the password (Not save in plain-text in the DB)
    def create(self, validated_data):
        user = super().create(validated_data)

        user.set_password(user.password)
        user.save()

        return user

    def validate(self, data):
        user = UserModel(**data)
        password = data.get('password')
        email = data.get('email')
        errors = {}
        try:
            password_validation.validate_password(password, user)
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)
        if errors:
            raise serializers.ValidationError(errors)
        return super().validate(data)

    # Remove password from repr response
    def to_representation(self, instance):
        # If we want to return nothing we can use: return {} in the case below return only username

        user_representation = super().to_representation(instance)
        user_representation.pop('password')
        return user_representation


class ChangePasswordSerializer(serializers.Serializer):
    model = UserModel

    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


class DetailsUserSerializer(serializers.ModelSerializer):

    # country = CountryField()
    class Meta:
        model = UserModel
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'email_visibility', 'age', 'gender')
        # fields = ('username', 'first_name', 'last_name', 'email', 'age', 'country', 'gender')


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('first_name', 'last_name', 'email_visibility', 'age', 'gender')

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email_visibility = validated_data.get('email_visibility', instance.email_visibility)
        instance.age = validated_data.get('age', instance.age)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.save()
        return instance