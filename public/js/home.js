var flavors = {
  'chocolate': '#774800',
  'vanilla': '#ffffff',
  'strawberry': '#ffb3b7'
};
var key = {};

$('.editor--option').on('click', function() {
  var childDropdown = $(this).children('.editor--option--dropdown');
  if (childDropdown.css('display') == 'none') {
    $('.editor--option--dropdown').hide();
    childDropdown.slideDown(800);
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
    $('#toppingsLength').val(toppings.length);
    $('#toppings').val(toppings);
  } else {
    parent.val(selection);
  }
  updateIceCream();
});

var updateIceCream = function() {
  var flavor = $('#flavor').val();
  var cone = $('#cone').val();
  var toppings = $('#toppings').val();

  if (toppings.length > 0) {
    toppings = toppings.split(',');
  };

  customizeIceCream('#display--image', {
    'flavor': flavor,
    'cone': cone,
    'toppings': toppings
  });
};

var customizeIceCream = function(containerId, key) {
  // hide all toggle-able options
  $(containerId + ' #toppingsSVG').children().hide();
  $(containerId + ' .icecream-cone').hide();

  // show only the ones that apply
  $(containerId + ' .icecream-top').css('fill', flavors[key.flavor]);
  $(containerId + ' .' + key.cone).show();
  for (var i = 0; i < key.toppings.length; i++) {
    $(containerId + ' #' + key.toppings[i]).show();
  };
};
