//Server for first deployement attempts, serve on port 8080

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;


//Allowing the use of CSS static files
app.use(express.static('./static'));


// sendFile will go here
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './static/accueil.html'));
});

app.listen(port);
console.log('Server started at http://localhost:' + port);