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
        break;
      case "wafer":
        $('.wafer').show();
        break;
    };
  });


});

$('#icecream-top--container').load('/icecream/top', function(){
    $('#sprinkles').hide();

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
      var color = $(this).attr('data');
      if (color == 'random') {
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
    });

    $('.toppings').on('click', 'div', function(){
      $(this).toggleClass('selected');
      var topping = $(this).attr('data');
      switch (topping) {
        case "sprinkles":
          $('#sprinkles').toggle();
          break;
      };
    });












});
