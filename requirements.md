# Software Requirements

## User Stories:

1. Title:

  - Covid-Compass 

2. User Story sentence

  - User wants to know how high are the Covid-19 case in a location before traveling 

3. Feature Tasks

  - User can login and check countries and states
  - User can save information 

4. Acceptance Tests

  - Ensure the user is login 
  - Ensure the user is connected to the database

## Feature order:

1. Landing/About us page (responsive page)

  - Click login
  - Form opens 
  - Bootstrap-react Form

2. User login (responsive page)

  - Use Auth0 with Google to login or user makes new login

3. User can search country data (responsive page)

  - Use CRUD with HTTP methods to request data from API
  - User can input country or state name to search data
  - Data will render on the right of the front page
  - A click button to save 

4. User can save data

  - Data added to the user profile

5. User can delete data

  - Data deleted from the user profile

6. User logout

  - User can click the logout button

## Stretch Goals

  - Donation page
  - Contact us page
  - Related news feed

## Non-Functional

  - Data Integrity requirement
    - Making sure data updates every 6 to 7 days

  - Scalability requirement
    - Making sure Apps is responsive to mobile phones
