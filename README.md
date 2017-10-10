# ColorSpace

View hosted app here:  https://coloryourspace.herokuapp.com/

ColorSpace is a design tool for turning your photos into color inspiration for your home.
You can use images in your personal collection or download and save images from the internet.

### How to use this app:

1. Choose a photo with colors you love. Your memories make for great inspiration.
   Don't have any personal photos? Upload images of famous art,
   landscapes, or anything that inspires you.
2. Submit your photo for analysis. Your custom color swatches will
   display in seconds, along with a guide for how to use your new, inspired color palate.
3. Choose paint colors or shop for furniture - with no need to print
   your results. Our responsive mobile site enables you to
   take your inspiration with you.


### User Stories:

1. I want to redecorate my living room using a photo I’ve taken for inspiration.

2. I want to use colors from a photograph I found online to choose new decorations for our forest inspired office space.  

3. I want to save my color palate to reference later when purchasing paint, furniture or accent pieces.  

4. I want to create color palates for multiple spaces in my home and save them under specific room labels.


### Process

Day 1 - Day 3
- User stories were created and basic app functionality was determined
- Routes and models were mapped
- Working from a functional auth-boilerplate, I added the models and basic routes
- Wire frames were constructed and initial Bootstrap columns were created
- Additional controllers were added for new routes
- Navigation bar was built

Day 4 - Day 6
- The API call was added and an additional page and route was added to handle the delayed data return from the API
- Put and Delete routes were added
- Bootstrap styling was added to buttons, cards and navigation bar
- Final bootstrap styles were added to give structure to pages displaying color
- CSS animation added to display color palate

Day 7 - Day 9
- Google fonts selected and added to style sheet
- Final style sheet updates made for bootstrap elements
- Readme file created


### Some Technologies Used

Async
Bcrypt
Bootstrap
Cloudinary
Express
EJS
Postgres Sequel


## Wireframe Sketches

### Home Page

![alt text](/public/img/home-page.png "Home")

The homepage will serve to welcome visitors to the site as well as show a picture demo of what the site can do.

### Profile Page

![alt text](/public/img/portfolio-page.png "Portfolio")

The "profile" or portfolio page is the users main dashboard for displaying all created spaces.

### Show Page

![alt text](/public/img/show-page.png "Show")

The "show" page is the individual showcase page for each created space. This is where the color palate is on display, along with notes and color values.


## Routes

![alt text](/public/img/routes.png "Routes")


## Models

![alt text](/public/img/user-model.png "Users")

Associations : Has many Spaces

![alt text](/public/img/space-model.png "Spaces")

Associations : Belongs to one User, Has many Colors

![alt text](/public/img/color-model.png "Colors")

Associations : Belongs to one Space


## API Used

http://mkweb.bcgsc.ca/color-summarizer/


## Challenges

- API Call to database data transfer. I had to add a middle page to handle the transition from data sent to the API, returned and values stored in the database.
- CSS flip animation for each color card was difficult to get working at the proper rate.
- Adjusting the settings so that the image analysis was more streamlined with the least amount of lag time.

## Next Steps

- Add a notes section for each color. Maybe allow user to name color.
- Analyze color by values returned. This would enable me to give the user specific recommendations for which colors are best for accent vs large scale application.
- Find and match Panetone color equivalents based on values returned.
- Offer sites where colors can be purchased as paint.
