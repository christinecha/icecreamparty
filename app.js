'use strict';

var stripe_publishable = process.env.STRIPE_PUBLISHABLE || "pk_test_hmLfFcjIvUb7KCtgJSQnfZOf";
var stripe_secret = process.env.STRIPE_SECRET || "sk_test_pINzxSOiWLyLBkFlTPg7ctEX";
var node_env = process.env.NODE_ENV || "development";
var port = process.env.PORT || 3000;

var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

if (node_env == "production") {
  var enforce = require('express-sslify');
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
};

app.get("/", function (req, res) {
  res.render("home.ejs", {
    stripe_publishable: stripe_publishable,
  });
});

app.get("/partials/:path", function (req, res) {
  var path = req.params.path;
  var file = 'partials/_' + path + '.ejs';
  res.render(file);
});

app.post("/newCharge", function(req, res) {
  var stripe = require("stripe")(stripe_secret);
  var stripeToken = req.body.stripeToken;
  var totalCharge = req.body.totalCharge * 100;
  var fullName = req.body.fullName;

  var charge = stripe.charges.create({
    amount: totalCharge,
    currency: "usd",
    source: stripeToken,
    description: "Example charge"
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      console.log(err);
    } else {
      console.log(charge);
    }
  });

  res.redirect('/');
})

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
