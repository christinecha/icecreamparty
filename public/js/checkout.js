function stripeResponseHandler(status, response) {
  var $form = $('#payment-form');

  if (response.error) {
    // Show the errors on the form
    $form.find('.payment-errors').text(response.error.message);
    $form.find('button').prop('disabled', false);
  } else {
    // response contains id and card, which contains additional card details
    var token = response.id;
    var totalCharge = $('#total-charge').attr('data');
    // Insert the token into the form so it gets submitted to the server
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
    $form.append($('<input type="hidden" name="fullName" />').val('Christine Cha'));
    $form.append($('<input type="hidden" name="totalCharge" />').val(totalCharge));
    // and submit
    $form.get(0).submit();
  }
};

jQuery(function($) {
  $('#payment-form').submit(function(e) {
    e.preventDefault();
    var $form = $(this);

    $form.find('button').prop('disabled', true);

    Stripe.card.createToken($form, stripeResponseHandler);

    return false;
  });
});
