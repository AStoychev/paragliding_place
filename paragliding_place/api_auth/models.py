from django.db import models

from enum import Enum

from django.contrib.auth import models as auth_models

from django.core import validators

from paragliding_place.api_auth.validators import validate_only_alphanumeric
from django_countries.fields import CountryField


class ChoicesEnumMixin:
    @classmethod
    def choices(cls):
        return [(x.name, x.value) for x in cls]

    @classmethod
    def max_len(cls):
        return max(len(name) for name, _ in cls.choices())


class Gender(ChoicesEnumMixin, Enum):
    Female = "Female"
    Male = "Male"
    Neuter = "Neuter"


class AppUser(auth_models.AbstractUser):
    USERNAME_MIN_LEN = 2
    USERNAME_MAX_LEN = 15

    FIRST_NAME_MIN_LEN = 3
    FIRST_NAME_MAX_LEN = 15

    LAST_NAME_MIN_LEN = 3
    LAST_NAME_MAX_LEN = 15

    MIN_LEN_GENDER = 2
    MAX_LEN_GENDER = 21

    MIN_VALUE_PRICE = 0.0

    username = models.CharField(
        max_length=USERNAME_MAX_LEN,
        null=True,
        blank=True,
        unique=True,
        validators=(
            validators.MinLengthValidator(USERNAME_MIN_LEN),
            validate_only_alphanumeric,
        ),
    )

    first_name = models.CharField(
        max_length=FIRST_NAME_MAX_LEN,
        null=True,
        blank=True,
        validators=(
            validators.MinLengthValidator(FIRST_NAME_MIN_LEN),
            validate_only_alphanumeric,
        ),
    )

    last_name = models.CharField(
        max_length=LAST_NAME_MAX_LEN,
        null=True,
        blank=True,
        validators=(
            validators.MinLengthValidator(LAST_NAME_MIN_LEN),
            validate_only_alphanumeric,
        ),
    )

    email = models.EmailField(
        unique=True,
        null=False,
        blank=False,
    )

    age = models.PositiveIntegerField(
        null=True,
        blank=True,
    )

    # You have to install first CountryField (pip install django-countries)
    # country = CountryField(
    #     null=False,
    #     blank=False,
    # )

    gender = models.CharField(
        choices=Gender.choices(),
        max_length=Gender.max_len(),
    )