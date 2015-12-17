var ref = new Firebase("https://miniscoopshop.firebaseio.com");
var currentSessionId;
var orderItemsCount = 0;
var currentOrderSubtotal = 0;
var currentOrderTotal = 0;

//// CART PREVIEW

var getCartItems = function(){
  console.log('getting orders of ', currentSessionId);
  ref.child('order_items').orderByChild('sessionId').equalTo(currentSessionId).on("child_added", function(snapshot) {
    var order = snapshot.val();
    var $orderPreview = $( "#display--image" ).clone().attr('id', snapshot.key()).addClass('order--preview');
    var $orderItemTitle = $('<span>').html(order.name);
    var $orderItemHardware = $('<span>').html(order.hardware).addClass('xsmall');
    var $orderItemPrice = $('<span>').html(order.subtotalFormatted);
    var $orderItemQuantity = $('<span>').html('x' + order.quantity);
    var $orderDetails = $('<div>').addClass('order--details').append($orderItemTitle, $orderItemHardware, $orderItemQuantity, '<br>', $orderItemPrice);
    var $orderPreview = $('<div>').addClass('order-item').append($orderPreview).append($orderDetails);

    $('#cart #order-items').append($orderPreview);
    currentOrderSubtotal+= Number(order.subtotal);
    currentOrderTotal = currentOrderSubtotal + 5;
    orderItemsCount+= 1;
    $('#cart-subtotal').html('$' + currentOrderSubtotal.toFixed(2));
    $('#cart-total').html('$' + currentOrderTotal.toFixed(2));

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

$('#header').on('click', '.showCart', function() {
  $("#flip-container").flip(true);
});

$('#header').on('click', '.showEditor', function() {
  $("#flip-container").flip(false);
});
