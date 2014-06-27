$(document).ready(function() {
  $('.box-wrapper .box h2').click(function() {
    $('.box-wrapper .box h2').removeClass('active');
    $(this).addClass('active');
  })

  $('.box.selector h2').click(function(e) {
    var id = $(e.currentTarget).data('id');
    $('.selected p').removeClass('active');
    $(e.currentTarget).parent().siblings('.selected').find("[data-id='" + id + "']").addClass('active');
  })

   $('.dollar-amount h4').click(function(e) {
      $(e.currentTarget).closest('.mobile-pricing .column').toggleClass('active');
   });

});