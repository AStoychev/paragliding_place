from django.db import models

from enum import Enum

from django.contrib.auth import models as auth_models

from django.core import validators

from paragliding_place.api_auth.validators import validate_only_alphanumeric
from django_countries.fields import CountryField

# For django reset password
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail


class ChoicesEnumMixin:
    @classmethod
    def choices(cls):
        return [(x.name, x.value) for x in cls]

    @classmethod
    def max_len(cls):
        return max(len(name) for name, _ in cls.choices())


class EmailVisibility(ChoicesEnumMixin, Enum):
    Visible = "Visible"
    Invisible = "Invisible"


class Gender(ChoicesEnumMixin, Enum):
    Female = "Female"
    Male = "Male"
    Neuter = "Neuter"
    No = "No"


class AppUser(auth_models.AbstractUser):
    USERNAME_MIN_LEN = 2
    USERNAME_MAX_LEN = 15

    FIRST_NAME_MIN_LEN = 3
    FIRST_NAME_MAX_LEN = 15

    LAST_NAME_MIN_LEN = 3
    LAST_NAME_MAX_LEN = 15

    EMAIL_VISIBILITY_LEN = 10

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

    email_visibility = models.CharField(
        choices=EmailVisibility.choices(),
        max_length=EMAIL_VISIBILITY_LEN,
        default="Visible"
    )

    age = models.PositiveIntegerField(
        null=True,
        blank=True,
        default=1
    )

    # You have to install first CountryField (pip install django-countries)
    # country = CountryField(
    #     null=False,
    #     blank=False,
    # )

    gender = models.CharField(
        choices=Gender.choices(),
        max_length=Gender.max_len(),
        default="No"
    )


# For django reset password

@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    email_plaintext_message = "{}?token={}".format(reverse('password_reset:reset-password-request'), reset_password_token.key)

    send_mail(
        # Title
        "Password Reset for {title}".format(title="SpotFly"),
        # Message
        email_plaintext_message,
        # From
        "noreply@somehost.local",
        # From developer purpose, show urls
        # First url - is for current email
        # Second is for put the new passwotd and token
        print(f"http://localhost:8000{email_plaintext_message}"),
        print("Copy this code and use it for reset your password in link below:", reset_password_token.key),
        print(f"http://localhost:8000/api/auth/password_reset/confirm/"),
        # To
        [reset_password_token.user.email]
    )