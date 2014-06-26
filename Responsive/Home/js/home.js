$(document).ready(function() {
  $('.box-wrapper .box h2').click(function() {
    $('.box-wrapper .box h2').removeClass('active');
    $(this).addClass('active');
  })
});