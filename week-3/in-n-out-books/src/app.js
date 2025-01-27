/**
 * Author: Sara George
 * Date: 1/25/2025
 * File Name: app.js
 * Description: Server configuration file for the in-n-out-books application
 */

const express = require("express");
const bcrypt = require("bcryptjs");
const path = require('path');
const createError = require("http-errors");
const app = express(); // Creates an Express application

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// GET route for the root URL
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="styles.css">
        <title>In-N-Out Books</title>
    </head>
    <style>
      * {
        margin: 0;
        padding: 0;
        border: 0;
      }

      body {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        background-color: #8cb89f;
      }

      header{
        text-align: left;
        padding: 1em 1em 1em 3em;
        background: #241e2b;
        color: #a089b9;
        border-bottom: 5px solid #1f1a25;
      }

      main{
        text-align: center;
        padding: 2em 0 1em 0;
        flex-grow: 1;
      }

      main p {
        color: #241e2b;
        padding: 5px;
      }

      h2 {
        color: #1f1a25;
        padding: 1em 0 1em 0;
      }

      h3 {
        color: #3a3243;
        padding: .5em 0 1em 0;
      }


      #pageHeadText h2, h3{
        padding: 5px;
      }

      #topBooks {
        display: inline-block;
        text-align: right;
      }

      #topBooks li {
        text-align: left;
      }

      #specialEvents {
        padding: 1.5em 0 .5em 0;
      }

      button {
        background-color: #a089b9;
        border: none;
        color: #201d2c;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        border: #593e75 solid 2px;
        border-radius: 10px;
        font-size: 15px;
        margin: .5em;
      }

      footer {
        background-color: #241e2b;
        height: 50px;
        margin: auto;
        width: 100vw;
        vertical-align: middle;
      }

      #footerText {
        text-align: center;
        color: #a089b9;
      }

      #footerText p {
        vertical-align: middle;
        margin: 15px 0 15px 0;
      }
    </style>

    <body>
        <header>
            <h1>Welcome to the In-N-Out Bookshop</h1>
        </header>
        <main>
          <div id="pageHeadText">
            <h2>We are your one-stop shop for all your reading needs!</h2>
            <h3> We have everything from novels to audiobooks!</h3>
          </div>

          <h2>Here are last month's top books:</h2>
          <div id="topBooks">
            <ol>
              <li>Fourth Wing by Rebecca Yarros</li>
              <li>The Big Empty by Robert Crais</li>
              <li>Iron Flame by Rebecca Yarros</li>
              <li>The Housemaid by Freida McFadden</li>
              <li>James by Percival Everett</li>
            </ol>
          </div>

          <h2>Our Shop Hours</h2>
          <ul>
            <li>Mon-Fri: 9am - 7pm</li>
            <li>Sat-Sun: 9am - 9pm</li>
          </ul>

          <h2> Contact us:</h2>
          <ul>
            <li>Phone Number: 1-800-###-####</li>
            <li>Email: InNOutBooks@gmail.com</li>
          </ul>

          <h3 id="specialEvents">Check our schedule to see if we have any upcoming author events.</h3>
          <button type="button" onclick="alert('Something went wrong! Please come back later')">Enter here!</button>
        </main>

        <footer>
            <div id="footerText"><p>&copy; 2025 In-N-Out Books</p></div>
        </footer>
    </body>
    </html>
  `);
});


// 404 error handling middleware
app.use(function(req, res, next) {
  res.status(404).send('404 Not Found');
});

// 500 error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const response = {
      message: err.message,
      status: status,
  };
  if (process.env.NODE_ENV === 'development') {
      response.stack = err.stack;
  }
  res.status(status).json(response);
});

// Export the Express application
module.exports = app;