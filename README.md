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

## Technical Implementation
Rarebnb utilizes React.js/Redux to maintain much of the site's data, which ensures a site that can render dynamically at great speeds. In order to do this, I had to be thoguhtful as to what should be passed down from component to component and what could feasibly live in store throughout a user's session. I found that keeping information on all of the available spots was incredibly helpful, as I could quickly pull that information and render it from store onto the homepage. It would also mean that the home page would dynamically update as users changed information or removed spots. Spot pages, on the other hand, used eager loading to fetch the information for a given spot, as it provided access to the same kind of information while also cutting down the amount of code necessary.

As I look to the future of this site, there are many features I wish to incorporate, such as the Reviews feature and the ability to sort and search through existing spots. All of these additions are to better enhance the flow, readibility, and useability of the site. By following the same framework I've laid out for myself with the existing Spots and Bookings features, I feel confident that these additions can be incorporated smoothly and will enhance the user experience overall.
