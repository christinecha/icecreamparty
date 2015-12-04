$('#header').load('/partials/header');
$('#footer').load('/partials/footer');

var ref = new Firebase("https://miniscoopshop.firebaseio.com");
var currentSessionId;

function authDataCallback(authData)
{
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
    currentSessionId = authData.uid;
    ref.child("sessions").child(authData.uid).update({
      lastOnline: Firebase.ServerValue.TIMESTAMP,
    });
  } else {
    console.log("User is logged out");
    newSession();
  }
}

var newSession = function(){
  ref.authAnonymously(function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
    }
  });
};

ref.onAuth(authDataCallback);
