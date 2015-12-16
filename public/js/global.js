var ref = new Firebase("https://miniscoopshop.firebaseio.com");
var currentSessionId;

//// CART PREVIEW

var getCartItems = function(){
  var currentOrderTotal = 0;
  console.log('getting orders of ', currentSessionId);
  ref.child('orders').orderByChild('sessionId').equalTo(currentSessionId).on("child_added", function(snapshot) {
    var order = snapshot.val();
    var $orderPreview = $( "#display--image" ).clone().attr('id', snapshot.key()).addClass('order--preview');
    var $orderItemTitle = $('<span>').html(order.name);
    var $orderItemHardware = $('<span>').html(order.hardware).addClass('xsmall');
    var $orderItemPrice = $('<span>').html(order.subtotalFormatted);
    var $orderItemQuantity = $('<span>').html('x' + order.quantity);
    var $orderDetails = $('<div>').addClass('order--details').append($orderItemTitle, $orderItemHardware, $orderItemQuantity, '<br>', $orderItemPrice);
    var $orderPreview = $('<div>').addClass('order-item').append($orderPreview).append($orderDetails);

    $('#cart #order-items').append($orderPreview);
    currentOrderTotal+= Number(order.totalprice);
    $('#subtotal').html(currentOrderTotal.toFixed(2));
    $('#total-charge').html((currentOrderTotal + 5).toFixed(2)).attr('data', (currentOrderTotal + 5));

    customizeIceCream('#' + snapshot.key(), order);
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

$("#flip-container").flip({
  trigger: 'manual'
});

$('#header').on('click', '.toggleCartPreview', function() {
  $("#flip-container").flip('toggle');
});
