$('#icecream-cone--container').load('/icecream/cone');
$('#icecream-top--container').load('/icecream/top', function(){

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

});
