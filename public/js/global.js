$('#header').load('/partials/header');
$('#footer').load('/partials/footer');

var ref = new Firebase("https://miniscoopshop.firebaseio.com");
var currentSessionId;

//// CART PREVIEW

var getCartItems = function(){
  var currentOrderTotal = 0;
  ref.child('sessions').child(currentSessionId).child('orders').on("child_added", function(snapshot) {
    var order = snapshot.val();
    var $orderItemImage = $('<img>').attr('src', '/assets/featured_placeholder.jpg');
    var $orderItemTitle = $('<h5>').html(order.flavor + ' ' + order.cone + ' cone');
    var $orderItemHardware = $('<p>').html(order.size + ' | ' + order.hardware + ' x' + order.quantity).addClass('xsmall');
    var $orderItemPrice = $('<h5>').html('$' + order.totalprice.toFixed(2));
    var $imageContainer = $('<div>').addClass('order-item--preview--image col-md-4').append($orderItemImage);
    var $detailsContainer = $('<div>').addClass('order-item--preview--details col-md-8 text-left').append($orderItemTitle, $orderItemHardware, $orderItemPrice);
    var $orderPreview = $('<div>').addClass('order-item--preview row').append($imageContainer).append($detailsContainer);

    $('#cartPreview .order-items').append($orderPreview);
    $('.checkout-order-items').append($orderPreview.clone());
    currentOrderTotal+= Number(order.totalprice);
    $('#subtotal').html(currentOrderTotal.toFixed(2));
    $('#total-charge').html((currentOrderTotal + 5).toFixed(2)).attr('data', (currentOrderTotal + 5));
  });
};

function authDataCallback(authData)
{
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
    currentSessionId = authData.uid;
    ref.child("sessions").child(authData.uid).update({
      lastOnline: Firebase.ServerValue.TIMESTAMP,
    });
    getCartItems();
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

$('#header').on('click', '.toggleCartPreview', function() {
  $('#cartPreview').show('slide', {direction: 'right'}, 600);
  $('.pageMask').show();
});

$('#header').on('click', '.exitCartPreview', function() {
  $('#cartPreview').hide('slide', {direction: 'right'}, 600);
  $('.pageMask').hide();
});
