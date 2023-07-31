# SpotFly
 
## About the app

SpotFly is web application who is created to help a junior paragliding pilot, but not only,  to find suitable place for their first fligt without instructor to guide them.  In this application you can find information about where is the launch and landing zone, coordinates, description, difficulty level of the place, wing direction for launch.

As a pilot with not much experience I never knew whether a place was suitable ot nor, what its a  characteristics to the place, what wind direction is suitable for launch. So I decide to develop this application and of course it's one of my biggest project at the moment in the field of web development. In addition to information about the place, you can also vote about difficulty level on place according to your experience and leave your comment.

I guess the app can save a lot of time for new pilots who looking for suitable lacations for theit solo flights.

## What I learn

I started developing the app in early 2023. From then to now, I,ve learned a lot about web programming. Related to ***Django REST***, sending emails vie ***Gmail SMTP*** and more detailed knowledge related to using the ***class base views***.

When I started devoloping the app I didn't have much experience with ***React***.So I started learning React in SoftUni course and made my first application entirely on React, which you can see here. Then I combined Django REST and React in the SpotFly project. Developing the project I learned a lot about ***states***, ***hooks*** and ***good prectices***. In its main part, the application present a map, for which I used ***React Leaflet***. Leaflet is a lightweight mapping library that utilizas OpenStreetMap.

## Features

The features thet the SpotFly app can do are:

**Create a new user:**
 - Register, Login, Logout;
 - Edit profile - ***only if the user is authorized;***
 - Password change - ***only if the user is authorized;***
 - Forgot password - ***only if the user is authorized;***

**Create a new flight location** - ***only for authenticated users***
 - Editin the place - ***only if the user is authorized;***
 - Information about the place - ***everyone can see the details, the rating and comments about the place;***
 - Rate System for difficulty of the place - ***only for authenticated user;***
 - Add comment - ***only for authenticated user;***
   - Delete and edit comment - ***only for authorized users***

 **Main Page**
 ![](https://github.com/AStoychev/paragliding_place/blob/main/client/paragliding-place-client/public/images/images%20not%20in%20app/SpotFly.jpg)

The application works with the ***GPS***.

When GPS is turned off, the map view is a smaller zoom that guides the user to Europe. When GPS is turned off the location button does not work.
![](https://github.com/AStoychev/paragliding_place/blob/main/client/paragliding-place-client/public/images/notNavigation.png)

When GPS is turned on, the map view has a larges zoom that guides the user to the place where he is located. Of course, there is a quick button which, after pressing, agains guide the user to the place where ha is located. ![](https://github.com/AStoychev/paragliding_place/blob/main/client/paragliding-place-client/public/images/navigation.png)

The application also has a search engine, with a field that hints at the searched location, at the moment when user starts typing.

![](https://github.com/AStoychev/paragliding_place/blob/main/client/paragliding-place-client/public/images/images%20not%20in%20app/searchEngine.jpg)

## Technologies:

I already mentioned someone above. The technologies used the applicatipon are:
### Backend:
 ***-Python***

 ***-Django REST***

### Frontend
 ***-JaveScript***

 ***-React***

 ***-React Leaflet***

### Database
 ***-PostgreSQL***

## How to install and run the project?

1. Clone the SpotFly with HTTPS:
   `git clone https://github.com/AStoychev/paragliding_place.git`

2. Open the app with PyCharm or Visual Studio Code. I personaly use both. For backend I use PyCharn and for frontend I use Visual Studio Code.
 
3. When open backend - this is folder ***paragliding_place***. You have to create changes in settings.py files.
   3.1.
   - SECRET_KEY;
   - DEBUG = FALSE;
   - ALLOWED_HOSTS = 'localhost 127.0.0.1';
   - CORS_ALLOWED_ORIGINS - the default port for React app is 3000;
   3.2. Then we have to set up database. I use PostreSQL:
     - DB_ENGINE;
     - DB_NAME;
     - DB_USER;
     - DB_PASSWORD;
     - DB_HOST;
     - DB_PORT.
   3.3. Then install all used libraries, modules and packages used in the applications with command: `pip install -r requirements.txt`
   3.4 Then start server with command: `python manage.py runserver` or just click rigth button over folder ***paragliding_place*** and click ***Run***
   3.5 ***Only for send emails*** If we want to send emails. This is functionality for reset password. We have to set up this in settings.py.
     - EMAIL_EMAIL_BACKEND = django.core.mail.backends.smtp.EmailBackend;
     - EMAIL_EMAIL_HOST = smtp.gmail.com;
     - EMAIL_EMAIL_HOST_USER = ***Enter the email that sends the messages***;
     - EMAIL_EMAIL_HOST_PASSWORD = ***The code that Gmail gives after setting up the 2-Step Verification***;
     - EMAIL_EMAIL_PORT = 587;
     - EMAIL_EMAIL_USE_TLS = True;
       You have to set up your Gmail 2-Step Verification. Follow the steps in this video: [Gmail 2-Step Verification](https://www.youtube.com/watch?v=Y_u5KIeXiVI). And can use this
       information for set up send email [Django Send Email](https://mailtrap.io/blog/django-send-email/)

5. When open frontend - this is folder ***client***. You have to install some packages.
   - First when open the folder client in terminal start command `npm i`;
   - Then in terminal: `cd paragliding-place-client\`
   - Then again install: `npm i`
   - A after that we start the app with: `npm start`
   - ***! If react icons show error we have to install in the same folder (paragliding_place\client>) react-icons with command: `npm install react-icons --save` . After that we can start the application with: `npm start`***

***If You have any questions, don't hesitate to write to me*** :raised_hand:
