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

 ***Main Page***
 ![](https://github.com/AStoychev/paragliding_place/blob/main/client/paragliding-place-client/public/images/SpotFly.jpg)

The application works with the ***GPS***.

When GPS is turned off, the map view is a smaller zoom that guides the user to Europe. When GPS is turned off the location button does not work.
![](https://github.com/AStoychev/paragliding_place/blob/main/client/paragliding-place-client/public/images/notNavigation.png)

When GPS is turned on, the map view has a larges zoom that guides the user to the place where he is located. Of course, there is a quick button which, after pressing, agains guide the user to the place where ha is located. ![](https://github.com/AStoychev/paragliding_place/blob/main/client/paragliding-place-client/public/images/navigation.png)

The application also has a search engine, with a field that hints at the searched location, at the moment when user starts typing.

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
