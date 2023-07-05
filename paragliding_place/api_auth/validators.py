from django.core import exceptions
from django.core.exceptions import ValidationError
from django.utils.deconstruct import deconstructible

ONLY_LETTERS_EXCEPTIONS_VALIDATOR = "Ensure this value contains only letters."


def validate_only_alphanumeric(value):
    for ch in value:
        if not ch.isalnum():
            raise exceptions.ValidationError(ONLY_LETTERS_EXCEPTIONS_VALIDATOR)