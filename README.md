# Rarebnb

## Summary
Rarebnb is a booking application inspired by Airbnb using Javascript utilizing React/Redux architecture. Rarebnb allows users to:
- Create an account
- Log in and log out
- Browse available spots (whether they are logged in or out)
- Host, update, and take down their own spots
- Book available spots and cancel those bookings
- View their bookings

## How to Use
To use Rarebnb, simply navigate to . As a user who is not logged in, you will be able to view all available spots and their information. If you wish to host a spot or create a booking, create an account and log in or try out the Demo Login.

## Overall Structure
### Back end
Rarebnb was built using Javascript and a postgreSQL database. All data requests use AJAX and are fulfilled with a JSON API, utilizing RESTful routes. 

## Front end
Rarebnb's front end is built entirely with React.js and JavaScript. This allows for quick rendering and re-rendering as pages dynamically update with the information retrieved from the Redux store.

## Technologies Used
- React.js
- Redux
- PostgreSQL
- JavaScript
- JSON API 
- Heroku

## To Do
- Implement a state dropdown for users on the hosting form for ease of use
- Implement a search/sort feature on the home page
- Add validations to prevent users from booking spots when they are already booked, either by themselves or by other users
- Implement a feature that allows hosts to post multiple images of their spots
- Implement a reviews feature
- Add ratings to spot pages, based on reviews
