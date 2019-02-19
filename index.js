// Import the express javascript library
var express = require('express');

const bbt = require('big-bang-theory');


// Transform name with first character capitalized and the 
// rest lower case
const fixName = function(name) {
  let newName = name.toLowerCase();
  newName = newName.charAt(0).toUpperCase() +
    newName.substr(1);
  return newName;
};



// Instantiate a server
var app = express();

// Set the port number to be compatible with Cloud 9
const PORT = 8080;

// Respond with "hello world" when a GET request is made
app.get('/', function (req, res) {
  // Send the text back to the client in response to the request
  res.json('Hello world -- My server is working!!!');
  // Log a message to the terminal window
  console.log((new Date()).toString()+' Message served to the client');
});

// Path 1: /baby-name/<name>
app.get('/baby-name/:name', function(req, res) {
  let data = byName[fixName(req.params.name)];
  res.json(data);
});

// Path 2: /baby-name/<name>/<year>
app.get('/baby-name/:name/:year', function(req, res) {
  let data = byName[fixName(req.params.name)];
  if (!data) data = [];
  // Check to see if the year matches what's requested.
  // item.year is a number but req.params.year is a string
  // so we need to add '' to the number to convert it to 
  // a string so that the types match when they're compared
  data = data.filter(item => item.year+'' === req.params.year);
  res.json(data);
});

// Path 3: /baby-name/<name>/after/<afterYear>
  app.get('/baby-name/:name/after/:year', function(req, res) {
    let data = byName[fixName(req.params.name)];
    if (!data) data = [];
    
    data = data.filter(item => item.year-1+'' === req.params.year);
    res.json(data);
  });

// Path 4: /baby-name/<name>/before/<beforeYear>
  app.get('/baby-name/:name/before/:year', function(req, res) {
    let data = byName[fixName(req.params.name)];
    if (!data) data = [];
    
    data = data.filter(item => item.year+1+'' === req.params.year);
    res.json(data);
  });
// Path 5: /baby-year/<year>
  app.get('/baby-year/:year', function(req, res) {
    let data = byYear[req.params.year];
    if (!data) data = [];
 
    data = data.sort((a,b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    res.json(data);
  });
// Path 6: /baby-year/<year>/<name>
  app.get('/baby-year/:year/:name', function(req,res) {
    let data = byYear[req.params.year];
    data = data.filter(item => item.name.toLowerCase() === req.params.name.toLowerCase());
    res.json(data);
  });
// Path 7: /baby-year/<year>/<letter>
// Babies born in <year> and names starting with <letter>
app.get('/baby-year/:year/first/:letter', function(req, res) {
  let data = byYear[req.params.year];
  if (!data) data = [];
  data = data.filter(item => item.name.charAt(0).toLowerCase() === req.params.letter.toLowerCase());
  data = data.sort((a,b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
  res.jsond(data);
});

// Path 8: /baby-year/<year>/last/<letter>
  app.get('/baby-year/:year/last/:letter', function(req, res) {
  let data = byYear[req.params.year];
  if (!data) data = [];
  data = data.filter(item => item.name.charAt(item.name.length -1).toLowerCase() === req.params.letter.toLowerCase());
  data = data.sort((a,b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
  res.json(data);
});
// Set up the server to 'listen' to requests on port 8080
// Requests to virtual machines running on Cloud 9 will use
// port 8080 by default.  You can force a URL request to a
// specific port by adding :nnnn to the end of the URL
app.listen(PORT, function () {
  // This function executes when a request is heard from the client
  console.log('Example app listening on port ' + PORT + '!');
});