How to run
===

- 'cd ./server'
- Using a recent version of Node, run 'npm install' followed by 'npm start'
- Then, visit 'http://localhost:3000/login.html' in your browser.

*Note*: make sure you use a Mac or some other computer that supports Unicode 9 or you may not see all the emojis.

Files
===

DataAnalysis/
    --> Graphs/  (contains historgrams and box plots of the various sample data sets generated in R)
         --> BlankScheme/
         --> EmojiScheme/
         --> ImageScheme/
         --> TextScheme/
         --> BP TimeTaken.png
    --> Logfiles/
         --> [assorted].csv files (the sample data we were given)
    --> Part1.R
    --> Part2.R
    --> README.md (the instructions for running Parts 1 and 2.R)
--> server/
    --> app.js    (the main controller)
    --> bin/www   (start script)
    --> logs/
         --> loginsNew.log (contains our raw data output from user logins)
    --> package.json   (npm package list)
    --> public/
         --> javascripts/login.js (the client side code for single page webapp)
         --> login.html
         --> stylesheets/savstyles.css (Sav's Styles)
    --> routes/   (node/express route handlers)
         --> grid.js   (handles the grid generator)
         --> index.js  (stub)
         --> login.js  (handles user and password verification)
         --> register.js (handles user creation)
         --> users.js  (stub)
    --> views/    (mostly unused stubs from Express generator)
         --> index, layout, error, status.hbs

