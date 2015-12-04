$('#icecream-cone--container').load('/icecream/cone', function(){
  $('.sugar').hide();

  $('.cones').on('click', 'div', function(){
    $(this).siblings().removeClass('selected');
    $(this).addClass('selected');
    $('.icecream-cone').hide();
    var type = $(this).attr('data');
    switch (type) {
      case "sugar":
        $('.sugar').show();
        $('#cone').val('sugar');
        break;
      case "wafer":
        $('.wafer').show();
        $('#cone').val('wafer');
        break;
    };
  });
});

$('#icecream-top--container').load('/icecream/top', function(){
  $('#sprinkles').hide();
  $('#fudge').hide();
  $('#cherry').hide();

  var colors = ["#ffeeff", "ffe54c", "ff59b1", "009ee3"];
  var index = Math.round(Math.random() * (colors.length - 1));

  $('#sprinkles').children('path').each(function(){
    var color = colors[index];
    $(this).css('fill', color);
    if (index >= colors.length - 1) {
      index = 0;
    } else {
      index+= 1;
    }
  });

  $('.flavors').on('click', 'div', function(){
    $(this).siblings().removeClass('selected');
    $(this).addClass('selected');
    var flavor = $(this).attr('data');
    var color = $(this).attr('data-color');
    if (flavor == 'random') {
      var characters = ['1','2','3','4','5','6','7','8','9','0','a','b','c','d','e','f'];
      var hex = '#';
      for (var i = 0; i < 6; i ++) {
        var random = Math.round(Math.random() * (characters.length - 1));
        hex+= characters[random];
        console.log(hex);
      };
      color = hex;
    };
    $('.icecream-top').css('fill', color);
    $('#flavor').val(flavor);
  });

  $('.toppings').on('click', 'div', function(){
    $(this).toggleClass('selected');
    var topping = $(this).attr('data');
    switch (topping) {
      case "sprinkles":
        $('#sprinkles').toggle();
        break;
      case "fudge":
        $('#fudge').toggle();
        break;
      case "cherry":
        $('#cherry').toggle();
        break;
    };

    var toppings = $('#toppings').val().split(',');
    var index = toppings.indexOf(topping);
    if (toppings == '') {
      toppings = topping;
    } else if (index < 0) {
      toppings.push(topping);
    } else {
      toppings.splice(index, 1);
    };
    $('#toppings').val(toppings);
  });
});

$('.size').on('click', 'div', function(){
  $(this).siblings().removeClass('selected');
  $(this).addClass('selected');
  $('.small-only').hide();
  var size = $(this).attr('data');
  var price = $(this).attr('data-price');
  var width;
  switch (size) {
    case "small":
      width = '160px';
      $('.small-only').show();
      break;
    case "medium":
      width = '180px';
      break;
    case "large":
      width = '200px';
      break;
  };
  $('#icecream-top--container').css('width', width);
  $('#icecream-cone--container').css('width', width);
  $('#size').val(size);
  $('#price--size').val(price);
  calculateTotalPrice();
});

$('.hardware').on('click', 'div', function(){
  $(this).siblings().removeClass('selected');
  $(this).addClass('selected');
  var hardware = $(this).attr('data');
  var price = $(this).attr('data-price');
  switch (hardware) {
    case "stud earring":
      //display something
      break;
    case "hook earring":
      //display something
      break;
    case "necklace":
      //display something
      break;
    case "ring":
      //display something
      break;
  };
  $('#hardware').val(hardware);
  $('#price--hardware').val(price);
  calculateTotalPrice();
});

$('.quantity input').on('change', function(){
  var quantity = $(this).val();
  $('#quantity').val(quantity);
  calculateTotalPrice();
});

var calculateTotalPrice = function(){
  var sizePrice = Number($('#price--size').val());
  var hardwarePrice = Number($('#price--hardware').val());
  var quantity = $('#quantity').val();
  var totalprice = (sizePrice + hardwarePrice) * quantity;
  totalprice = '$' + totalprice.toFixed(2);
  $('#totalprice').val(totalprice);
}
// submit form

$('#submitDesign').on('submit', function(e) {
  e.preventDefault();
  var flavor = $('#flavor').val();
  var cone = $('#cone').val();
  var toppings = $('#toppings').val();
  var size = $('#size').val();
  var hardware = $('#hardware').val();
  var quantity = $('#quantity').val();
  var totalprice = $('#totalprice').val();
  ref.child('sessions').child(currentSessionId).child('orders').push({
    flavor: flavor,
    cone: cone,
    toppings: toppings,
    size: size,
    hardware: hardware,
    quantity: quantity,
    totalprice: totalprice,
    createdAt: Firebase.ServerValue.TIMESTAMP,
  })
  $('#cartPreview').show('slide', {direction: 'right'}, 600);
  $('.pageMask').show();
  return false;
});
