$(document).ready( function() {
  alert('on master');

  $("#tweet-text").on('input', function() {
    let $counterElement = $(this).parent().children('.btn-counter').children('.counter');
    let characterLength = $(this).val().length;
    const initialValue =  140;
    let currentValue = initialValue - characterLength;

    if( currentValue < 0 ) {
      $counterElement.css('color', 'red');
    } else {
      $counterElement.css('color', '#545149');
    }
      $counterElement.text(currentValue);
  });

}); 

