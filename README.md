# CollabApp

CollabApp aims for finding collaborators for online projects. 

Similar to dating apps that match based on preferences, it matches groups of people who are interested in working on the same kind of project. 

This app is tailored to people who want to work on side projects but don't have the networking skills to find collaborators.

Create your profile with your skills by registration, and then autoMatch for a group based on those skills. You will be shown a selection of projects that match your settings.
You can talk to the group members and get more information about this project, send a join request if everything goes well. After joining a group, you can set goals for the project, or send mentor requests when you get stuck.


Target Audience: People who have great ideas for a project, but need collaborators with specific skills. People who want to join a project, but don’t have any ideas. Any professionals or amateur project makers Web designers, Software designers, YouTubers, artists, writers, game designers Mentors.


[Deployment link on heroku, welcome to check it out and have fun!](https://rocky-coast-47563.herokuapp.com/)


### Tech stack
React, Express, Sequelize, Socket.io


## Running the projects

You need **TWO** terminal windows/tabs for this (or some other plan for running two Node processes).

In one terminal, `cd` into `client`. Run `npm install` or `yarn` to install the dependencies. Then run `npm start` or `yarn start`, and go to `localhost:3000` in your browser.

In the other terminal, `cd` into root folder. Run `npm install` or `yarn` to install the dependencies, then run `npm run db:reset` or `yarn run db:reset`to set the database, finally `npm run dev` or `yarn run dev` to launch the server.

In the browser, you can see the data get loaded.

### Screenshot
#### Register and pick your skills
|![gif](https://github.com/Jessie-p05/Collab-App/blob/master/client/public/image/register.gif?raw=true)|
| ------ |



#### AutoMatch the projects which fit your set skills
##### which is:
##### Javascript, React, Ruby in this example

|![gif](https://github.com/Jessie-p05/Collab-App/blob/master/client/public/image/autoMatch.gif?raw=true)|
| ------ |
#### Chat to the group and join
|![gif](https://github.com/Jessie-p05/Collab-App/blob/master/client/public/image/chat.gif?raw=true)|
| ------ |
#### Set goals or send mentor request
|![gif](https://github.com/Jessie-p05/Collab-App/blob/master/client/public/image/goal%20and%20mentor.gif?raw=true)|
| ------ |
## Future implement
* refactor to use react router
* search bar auto submit
* fb / google login
* text / email notifications
* github API
* Be able to block certain keywords
* project preferences and interests - group size, language, working hours
* other people could give you points for adding to the discussion and completing targets, like stack overflow.
* Once the group decided the project was complete, it would be displayed on the "completed projects" page of the app, and data about the * group could be added to "successful groups" to help organize other groups in the future. If the group decided to abandon the project, * the data could be added to "failed groups".
* Analytics page, where you can see the success rate of your previous projects, timeline, points, etc.
* Media connections, linking fb, twitter, discord and zoom.
* Awards and badges to give to other people a la reddit
* Mentorship connection: have the ability to chat either one on one or with the group to respected mentors in any field.
* mentor dashboard
* email/text notifications
* block access before login
* testimonials
* become a mentor button
* more search options
* project lead / mentor notifacations in site
* project analytics
* project lead moderation
* public / private projects
* invite friends
* complete / fail project
* modify project description / title
* member limits
* chatroom polls





