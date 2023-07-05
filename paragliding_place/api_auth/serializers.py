from django.contrib.auth import password_validation, get_user_model
from django.core import exceptions
from rest_framework import serializers

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


class DetailsUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'age', 'gender')
        # fields = ('username', 'first_name', 'last_name', 'email', 'age', 'country', 'gender')
