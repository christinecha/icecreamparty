var flavors = {
  'chocolate': '#774800',
  'vanilla': '#ffffff',
  'strawberry': '#ffb3b7'
};

var key = {
  'name': 'Untitled',
  'flavor': 'vanilla',
  'cone': 'sugar',
  'toppings': '',
  'hardware': 'earrings',
  'price': 12,
  'quantity': 1,
  'subtotal': 12,
  'subtotalFormatted': '$12.00',
};

$('.editor--option').on('click', function() {
  $(this).siblings().removeClass('opened');
  $(this).addClass('opened');
  var childDropdown = $(this).children('.editor--option--dropdown');
  if (childDropdown.css('display') == 'none') {
    $('.editor--option--dropdown').hide();
    childDropdown.show('slide',{direction:'up'});
  }
});

$('.editor--option--dropdown .option').on('click', function() {
  var parent = $(this).parent().siblings('input');
  var selection = $(this).attr('data');

  if (parent.attr('id') == 'toppingsLength') {
    var toppings = $('#toppings').val();
    if (toppings.length <= 0) {
      var toppings = [selection];
    } else {
      var toppings = toppings.split(',');
      var index = toppings.indexOf(selection);
      if (index < 0) {
        toppings.push(selection);
      } else {
        toppings.splice(index, 1);
      }
    }
    $(this).toggleClass('selected');
    $('#toppingsLength').val(toppings.length);
    $('#toppings').val(toppings);
  } else {
    $(this).siblings().removeClass('selected');
    $(this).addClass('selected');
    parent.val(selection);
  }
  updateIceCream();
});

$('#quantity').on('change', function() {
  updateIceCream();
});

$('#name').on('change', function() {
  updateIceCream();
});

var updateIceCream = function() {
  var flavor = $('#flavor').val();
  var cone = $('#cone').val();
  var toppings = $('#toppings').val();
  var hardware = $('#hardware').val();
  var quantity = $('#quantity').val();
  var name = $('#name').val();

  if (toppings.length > 0) {
    toppings = toppings.split(',');
  };

  if (hardware == 'necklace') {
    var unit_price = 14;
  } else {
    var unit_price = 12;
  };

  var subtotal = unit_price * quantity;
  var subtotalFormatted = '$' + subtotal.toFixed(2);
  key = {
    'name': name,
    'flavor': flavor,
    'cone': cone,
    'toppings': toppings,
    'hardware': hardware,
    'price': unit_price,
    'quantity': quantity,
    'subtotal': subtotal,
    'subtotalFormatted': subtotalFormatted,
  };
  console.log(key);
  customizeIceCream('#display--image', key);
  $('#subtotal').val(subtotalFormatted);
};


var customizeIceCream = function(containerId, key) {
  // hide all toggle-able options
  $(containerId + ' #toppingsSVG').children().hide();
  $(containerId + ' #hardwareSVG').children().hide();
  $(containerId + ' .icecream-cone').hide();

  // show only the ones that apply
  $(containerId + ' .icecream-top').css('fill', flavors[key.flavor]);
  $(containerId + ' .' + key.cone).show();
  for (var i = 0; i < key.toppings.length; i++) {
    $(containerId + ' #' + key.toppings[i]).show();
  };
  $(containerId + ' #' + key.hardware).show();
};


$('#createIceCream').on('submit', function(e) {
  e.preventDefault();
  var newOrder = ref.child('order_items').push(key);
  ref.child('order_items').child(newOrder.key()).update({
    sessionId: currentSessionId,
    createdAt: Firebase.ServerValue.TIMESTAMP,
  });
  $("#flip-container").flip('true');
  return false;
});
