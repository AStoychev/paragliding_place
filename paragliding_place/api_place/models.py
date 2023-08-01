from django.contrib.auth import get_user_model
from django.db import models

UserModel = get_user_model()

DIFFICULTY_CHOICES = (
    ("A", "A"),
    ("B", "B"),
    ("C", "C"),
    ("D", "D")
)


class Place(models.Model):
    MAX_PLACE_LEN = 30
    DEFAULT_STATE = False

    MAX_URL_LEN = 500

    MAX_DIRECTION_LEN = 3

    MAX_LATITUDE_LONGITUDE = 10

    MAX_DIFFICULTY_CHOICES = 3

    place = models.CharField(
        max_length=MAX_PLACE_LEN,
        null=False,
        blank=False,
        unique=True,
        default="",
    )

    description_landing = models.TextField(
        null=False,
        blank=False,
        default="",
    )

    description_launch = models.TextField(
        null=False,
        blank=False,
        default="",
    )

    latitude_takes_off = models.CharField(
        max_length=MAX_LATITUDE_LONGITUDE,
        null=False,
        blank=False,
        default="",
    )

    longitude_takes_off = models.CharField(
        max_length=MAX_LATITUDE_LONGITUDE,
        null=False,
        blank=False,
        default="",
    )

    latitude_landing = models.CharField(
        max_length=MAX_LATITUDE_LONGITUDE,
        null=False,
        blank=False,
        default="",
    )

    longitude_landing = models.CharField(
        max_length=MAX_LATITUDE_LONGITUDE,
        null=False,
        blank=False,
        default="",
    )

    difficulty_level = models.CharField(
        choices=DIFFICULTY_CHOICES,
        max_length=MAX_DIFFICULTY_CHOICES,
        null=False,
        blank=False,
        default="",

    )

    direction = models.JSONField()

    user = models.ForeignKey(
        UserModel,
        on_delete=models.RESTRICT,
    )


class Comments(models.Model):
    MAX_LEN_TEXT = 500
    MAX_LEN_OWNER = 15

    MAX_LEN_INTEGER_FIELD = 500

    text = models.CharField(
        max_length=MAX_LEN_TEXT,
        null=False,
        blank=False,
        default="",
    )

    owner = models.CharField(
        max_length=MAX_LEN_OWNER,
        null=False,
        blank=False,
        default="",
    )

    place_comment = models.CharField(
        max_length=MAX_LEN_INTEGER_FIELD,
        null=False,
        blank=False,
        default="",
    )

    user = models.ForeignKey(
        UserModel,
        on_delete=models.RESTRICT,
    )

    date_time = models.DateTimeField(
        auto_now_add=True,
    )


class Rating(models.Model):
    MAX_LEN_OWNER = 15
    MAX_LEN_RATING = 3
    MAX_LEN_INTEGER_FIELD = 500

    rating = models.CharField(
        max_length=MAX_LEN_RATING,
        null=False,
        blank=False,
        default=""
    )

    owner = models.CharField(
        max_length=MAX_LEN_OWNER,
        null=False,
        blank=False,
        default="",
    )

    place_id_rating = models.CharField(
        max_length=MAX_LEN_INTEGER_FIELD,
        null=False,
        blank=False,
        default="",
    )

    user = models.ForeignKey(
        UserModel,
        on_delete=models.RESTRICT,
    )
