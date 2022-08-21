const $toggleTop = $('.toggle-top');

$(document).scroll(function () {
  const fromTop = $(this).scrollTop();
  if(fromTop > 50) {
    $toggleTop.show();
  } else {
    $toggleTop.hide();
  }
});

$toggleTop.click(function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  $('.new-tweet').slideToggle();
});





