'use strict';

var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");

var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.render("home.ejs");
});

app.get("/customizer", function (req, res) {
  res.render("customizer.ejs");
});

app.get("/partials/:path", function (req, res) {
  var path = req.params.path;
  var file = 'partials/_' + path + '.ejs';
  res.render(file);
});

app.get("/icecream/:path", function(req, res) {
  var path = req.params.path;
  var file = "icecream/" + path + ".ejs";
  res.render(file);
});


app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
