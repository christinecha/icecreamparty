'use strict';

var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");

var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.render("index.ejs");
});

app.get("/icecream/:part", function(req, res) {
  var keyword = req.params.part;
  var url = "icecream/" + keyword + ".ejs";
  res.render(url);
});


app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
