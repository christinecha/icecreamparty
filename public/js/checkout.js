var maximize = function(selector) {
  $(selector).css({
    'height': 'inherit',
    'overflow': 'hidden',
  });
};

var minimize = function(selector) {
  $(selector).css({
    'height': 0,
    'overflow': 'hidden',
  });
};

minimize('#shipping');

$('.showShipping').on('click', function() {
  $('#shipping input').first().focus();
});

$('.showBilling').on('click', function() {
  $('#billing input').first().focus();
});

$('#billing input').on('focus', function() {
  maximize('#billing');
  minimize('#shipping');
  $('.showShipping').removeClass('selected');
  $('.showBilling').addClass('selected');
});

$('#shipping input').on('focus', function() {
  maximize('#shipping');
  minimize('#billing');
  $('.showBilling').removeClass('selected');
  $('.showShipping').addClass('selected');
});

var newOrder = function() {
  var order = ref.child('orders').push({
    status: 'confirmed',
    sessionId: currentSessionId,
    createdAt: Firebase.ServerValue.TIMESTAMP,
  });
  var orderId = order.key();

  ref.child('order_items').orderByChild('sessionId').equalTo(currentSessionId).on("child_added", function(snapshot) {
    ref.child('orders').child(orderId).child('order_items').push(snapshot.key());
  });
};

function stripeResponseHandler(status, response) {
  var $form = $('#newCharge');
  if (response.error) {
    // Show the errors on the form
    $form.find('.payment-errors').text(response.error.message);
    $form.find('button').prop('disabled', false);
  } else {
    // response contains id and card, which contains additional card details
    var token = response.id;
    // Insert the token into the form so it gets submitted to the server
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
    $form.append($('<input type="hidden" name="totalCharge" />').val(10));
    newOrder();
    // and submit
    $form.get(0).submit();
  }
};

$('#newCharge').on('submit', function(e) {
  e.preventDefault();
  var $form = $(this);
  $form.find('button').prop('disabled', true);
  Stripe.card.createToken($form, stripeResponseHandler);
  return false;
});
