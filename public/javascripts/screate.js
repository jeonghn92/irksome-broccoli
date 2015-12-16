function short(){
  $('.short').click(function(){
    $('p').append($('input.short').html());
    $('#long').remove();
    $('#single').remove();
    $('#multi').remove();
    $('button.addsingle').show('fast');
    $('button.addmulti').show('fast');
  });
}
function long(){
  $('.long').click(function(){
    $('#short').remove();
    $('#long').append('fast');
    $('#single').remove();
    $('#multi').remove();
    $('button.addsingle').show('fast');
    $('button.addmulti').show('fast');
  });
}
function single(){
  $('.single').click(function(){
    $('#short').remove();
    $('#long').remove();
    $('input.single').show('fast');
    $('#multi').remove();
    $('button.addsingle').show('fast');
    $('button.addmulti').show('fast');
  });
}
function multi(){
  $('.multi').click(function(){
    $('#short').remove();
    $('#long').remove();
    $('input.single').remove();
    $('input.multi').show('fast');
    $('button.addsingle').show('fast');
    $('button.addmulti').show('fast');
  });
}
function addsingle(){
  $('button.addsingle').click(function(){
    $('input.single').append($('input.single'));
  });
}
