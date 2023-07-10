# from django.contrib.auth import get_user_model
# from django.db import models
#
#
# from django.dispatch import receiver
# from django.urls import reverse
# from django_rest_passwordreset.signals import reset_password_token_created
# from django.core.mail import send_mail
#
# from paragliding_place.api_auth.models import AppUser
#
# UserModel = get_user_model()
#
#
# @receiver(reset_password_token_created, sender=AppUser)
# def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
#
#     email_plaintext_message = "{}?token={}".format(reverse('password_reset:reset-password-request'), reset_password_token.key)
#
#     send_mail(
#         # Title
#         "Password Reset for {title}".format(title="SpotFly"),
#         # Message
#         email_plaintext_message,
#         # From
#         "noreply@somehost.local",
#         # From developer purpose, show urls
#         # First url - is for current email
#         # Second is for put the new passwotd and token
#         print(f"http://localhost:8000{email_plaintext_message}"),
#         print("Copy this code and use it for reset your password in link below:", reset_password_token.key),
#         print(f"http://localhost:8000/api/auth/password_reset/confirm/"),
#         # To
#         [reset_password_token.user.email]
#     )