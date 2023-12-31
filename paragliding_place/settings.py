import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = bool(os.environ.get('DEBUG'))

ALLOWED_HOSTS = []

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    # os.environ.get('CORS_ALLOWED_ORIGINS'),
]

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'django_rest_passwordreset',
    'rest_framework.authtoken',
    'corsheaders',
    'django_countries',

    'requests',

    'paragliding_place.api_place',
    'paragliding_place.api_auth',
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ],
    # This is for logout default settings
    # 'DEFAULT_PERMISSION_CLASSES': (
    #         'rest_framework.permissions.IsAuthenticated',
    #         'rest_framework.permissions.IsAdminUser',
    #    ),
}

ROOT_URLCONF = 'paragliding_place.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates']
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'paragliding_place.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": 'django.db.backends.postgresql',
        "NAME": 'paragliding_place',
        "USER": 'postgres',
        "PASSWORD": 'asdfasdf',
        "HOST": '127.0.0.1',
        "PORT": '5432',
    }
}

# DATABASES = {
#     "default": {
#         "ENGINE": os.environ.get('DB_ENGINE'),
#         "NAME": os.environ.get('DB_NAME'),
#         "USER": os.environ.get('DB_USER'),
#         "PASSWORD": os.environ.get('DB_PASSWORD'),
#         "HOST": os.environ.get('DB_HOST'),
#         "PORT": os.environ.get('DB_PORT'),
#     }
# }

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

# Dont forget to delete first if or delete all if else after finishing the whole paragliding place project
if DEBUG:
    AUTH_PASSWORD_VALIDATORS = []
else:
    AUTH_PASSWORD_VALIDATORS = [
        {
            'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
        },
    ]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

# This is from my project paragliding shop
AUTH_USER_MODEL = 'api_auth.AppUser'

# This is for sending email in post

EMAIL_BACKEND = os.environ.get('EMAIL_EMAIL_BACKEND')
EMAIL_HOST = os.environ.get('EMAIL_EMAIL_HOST')
EMAIL_HOST_USER = os.environ.get('EMAIL_EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_EMAIL_HOST_PASSWORD')
EMAIL_PORT = os.environ.get('EMAIL_EMAIL_PORT')
EMAIL_USE_TLS = os.environ.get('EMAIL_EMAIL_USE_TLS')

# Тhis is for sending email in post

DJANGO_SETTINGS_MODULE = True

# This is for slash in api_place url
# APPEND_SLASH = False
SILENCED_SYSTEM_CHECKS = ['urls.W002', 'security.W019']

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
