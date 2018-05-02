$(function() {

  var screend = [];
  var array = [];
  var start = true;

  $('.number').click(function() {
    if ($('.screen').html() == '+' || $('.screen').html() == '-' || $('.screen').html() == '*' || $('.screen').html() == '/' || start == true) {
      $('.screen').html('');
      if (start == true) {
        $('.history').html('');
      }
      start = false;
    }
    screend.push($(this).children().closest('p').html());
    $('.screen').append($(this).children().closest('p').html());
    $('.history').append($(this).children().closest('p').html());
    checkScreenLength();
  });

  $('.operation').click(function() {
    switch (screend[screend.length - 1]) {
      case '.':
        screend.pop();
        array.push(parseFloat(screend.join("")));
        array.push($(this).children().closest('p').html());
        $('.screen').html($(this).children().closest('p').html());
        $('.history').append($(this).children().closest('p').html());
        screend = [];
        checkScreenLength();
        break;
      case '=':
      case '+':
      case '-':
      case '*':
      case '/':
      case undefined:
        // NO ACTION
        break;
      default:
        // NUMBER
        array.push(parseFloat(screend.join("")));
        array.push($(this).children().closest('p').html());
        console.log(array);
        $('.screen').html($(this).children().closest('p').html());
        $('.history').append($(this).children().closest('p').html());
        screend = [];
        checkScreenLength();
    }
  });

  $('.dot').click(function() {
    if (($('.screen').html() == '+' || $('.screen').html() == '-' || $('.screen').html() == '*' || $('.screen').html() == '/') && screend.indexOf('.') < 0) {
      $('.screen').html('0');
      $('.history').append('0');
    }
    if (screend.indexOf('.') < 0) {
      screend.push($(this).children().closest('p').html());
      $('.screen').append($(this).children().closest('p').html());
      $('.history').append($(this).children().closest('p').html());
      start = false;
      checkScreenLength();
    }
  });

  $('.ac').click(function() {
    $('.screen').html('0');
    $('.history').html('0');
    start = true;
    screend = [];
    array = [];
  });

  $('.ce').click(function() {
    // TODO: CE BUTTON action
  });

  $('.outcome').click(function() {

    switch (screend[screend.length - 1]) {
      case '.':
        screend.pop();
        array.push(parseFloat(screend.join("")));
        array.push($(this).children().closest('p').html());
        $('.screen').html($(this).children().closest('p').html());
        $('.history').append($(this).children().closest('p').html());
        screend = [];
        count();
        break;
      case '=':
      case '+':
      case '-':
      case '*':
      case '/':
      case undefined:
        // NO ACTION
        break;
      default:
        // NUMBER
        array.push(parseFloat(screend.join("")));
        console.log(array);
        $('.screen').html($(this).children().closest('p').html());
        $('.history').append($(this).children().closest('p').html());
        screend = [];
        count();
    }

  });

  function count() {
    while (array.length > 1) {
      switch (array[1]) {
        case '+':
          var sum = array[0] + array[2];
          array.shift();
          array.shift();
          array.shift();
          array.unshift(sum);
          break;
        case '-':
          var diff = array[0] - array[2];
          array.shift();
          array.shift();
          array.shift();
          array.unshift(diff);
          break;
        case '*':
          var prod = array[0] * array[2];
          array.shift();
          array.shift();
          array.shift();
          array.unshift(prod);
          break;
        case '/':
          var quot = array[0] / array[2];
          array.shift();
          array.shift();
          array.shift();
          array.unshift(quot);
          break;
        default:
          break;
      }
    }
    // SHOW OUTPUT
    $('.screen').html(array[0]);
    $('.history').append(array[0]);
    start = true;
    array = [];
    screend = [];
  }

  function checkScreenLength(){
    if ($('.screen').html().length >= 13 || $('.history').html().length >= 20) {
      start = true;
      array = [];
      screend = [];
      $('.screen').html('0');
      $('.history').html('Digit Limit Met');
    }
  }

});


// SHOULD USE BUTTONS IN HTML?
// WHAT IF DOT COMES FIRST? . + . -> NaN problem
// BUTTONS ANIMATIONS
// PRECISION BUG?
