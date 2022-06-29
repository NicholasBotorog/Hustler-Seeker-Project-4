# General Assembly 

# Project-4 - Hustle Seeker 

Hustle Seeker is a web-app where you can search for jobs, apply to jobs, post reviews and also post your own jobs. 


## Final Product 

[Hustle Seeker](https://husle-seeker-eu.herokuapp.com/)


## Goal 

This was an 8 day solo project. I was asked to build a full stack application with a React front-end and a Django back-end, a fully functional RESTful API with all routes(GET, POST ,PUT, DELETE) and relationships including OneToMany and ManyToMany.


## Technologies used 

* HTML5.
* CSS.
* React & React Router.
* Axios.
* Bootstrap.
* JavaScript.
* Django.
* Python.
* Yarn.
* Github.
* TablePlus


## Planning 

I started with planning how the back-end is going to look and how the user is going to interact with my app. 
I created a wireframe of the back-end:

<img width="1176" alt="Screen Shot 2022-06-28 at 12 11 30 PM" src="https://user-images.githubusercontent.com/103049873/176141414-7bffa2a1-3a9a-484a-8f01-9aa8cc33b104.png">


## Build process
## Back-end
After I had the wireframe finished I started to work on the back-end. I created the jwt_auth directory with views and urls to allow users to register and login in order to implement the relationships for my app. 

I continued by creating the Jobs folder. The job model has a ManyToManyField where you can add one or multiple tags according to the industry of the job. 

<img width="788" alt="Screen Shot 2022-06-28 at 12 16 49 PM" src="https://user-images.githubusercontent.com/103049873/176142374-0f07f8db-5863-4cb0-a4e2-cacab2c59a98.png">

Next I implemented the Apply and Reviews app. The models are based on ManyToOne relationships between the reviews/application and the jobs and the owner. 

<img width="497" alt="Screen Shot 2022-06-28 at 12 18 50 PM" src="https://user-images.githubusercontent.com/103049873/176142785-063452d3-4da0-4425-a09d-d969469c1204.png">
<img width="497" alt="Screen Shot 2022-06-28 at 12 18 36 PM" src="https://user-images.githubusercontent.com/103049873/176142814-1177a1d0-f04f-4325-a02f-a936b3d4cb1d.png">

## Front-end
<img width="1358" alt="Screen Shot 2022-06-28 at 1 07 39 PM" src="https://user-images.githubusercontent.com/103049873/176153541-0867a3bf-a906-47c9-895c-33945c437034.png">

After I completed the back-end and I made sure, using Insomnia, that everything is working fine I started to build the front-end. 

I began creating the register and login page. 
After this I create the jobs listing page, which has different filters such as:

* Search field where you can search by job title or by company name 
* Dropdown for all the locations 

<img width="1358" alt="Screen Shot 2022-06-28 at 12 40 15 PM" src="https://user-images.githubusercontent.com/103049873/176147366-a53f4811-a4c9-496b-b8b9-9524284a065a.png">

All the jobs are displayed as cards, containing the logo of the company, company name, job title, tags, type of job, date that was posted. A button will reveal more informations about the job, which also includes a button that takes the user to the full job page.
On the main page, there are displayed only 3 jobs at once; a load more button will reveal 3 more jobs every time. 

<img width="1358" alt="Screen Shot 2022-06-28 at 12 46 19 PM" src="https://user-images.githubusercontent.com/103049873/176148696-889f9782-efeb-4df3-9f4c-a3aaf32d0063.png">

The individual job's page will reveal all the informations about the job, including the salary, description, the tags, the number of aplicants (only if the user is the owner of the job), and also the "Apply button". Apply button consists in 2 different endpoints: one for confirming the interest and another one for canceling. 
Also Viewing, Posting and Deleting reviews is possible.
Trying to give the user a more dynamic feeling of the webpage I implemented Viewing and Posting Reviews inside a modal overlaying the job's page. 

<img width="1358" alt="Screen Shot 2022-06-28 at 12 52 51 PM" src="https://user-images.githubusercontent.com/103049873/176150416-e012faf1-9f20-4aa0-8a3a-52bdf895d232.png">

The profile page displayes the jobs that the user posted and also the jobs that the user has applied to. 

<img width="1358" alt="Screen Shot 2022-06-28 at 1 12 46 PM" src="https://user-images.githubusercontent.com/103049873/176154597-c3658041-8cc0-44e1-a955-489b98613dbf.png">

I tried to keep the style clean and minimalistic. 

## Key learnings:

* I understood much better the authentication process.
* I learnt that time managements is crucial when doing a solo project. Planning is everything and by doing it solo there are a lot of unpredictable problems that are going to occur that need to be taken in consideration.
* I learnt a lot about React
* By this project I was a lot more in tune with how I work best and got into a good, productive workflow each day; it was intimidating to do the project solo however I wanted to make sure I really knew where my personal strengths and weaknesses lay.


## Challenges:

* Time managing, prioritizing some aspects of the app. 



## Future improvements:

* Implementing the ability to edit user profile.  
* Implementing the ability to find other users and leave them a review. 






