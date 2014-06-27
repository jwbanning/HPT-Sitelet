
$(document).ready(function() {
    $('form input[name=brokerage]').change(function(){
      // $('.commisionFreeContainer p').removeClass('hide').addClass('show');
      // $('#moreInfo').html('- Less Info');
    });

    $('.formContainer form input').change(function(e){
      if (!$(e.currentTarget).siblings('.commisionFreeContainer').hasClass('active')) {
        $(e.currentTarget).siblings('.commisionFreeContainer').addClass('active');
      };
    });

    $('.seven60ContentRight .copy2 input').change(function(e){
      if ($(e.currentTarget).is(':checked') == true ) {
        $('.fund-earn').addClass('active');
      }
      else {
        $('.fund-earn').removeClass('active');
      }
    });

    $( "#moreInfo" ).click(function() {
      if ($(".commisionFreeContainer p" ).hasClass('hide')){
        $('.commisionFreeContainer p').removeClass('hide').addClass('show');
        $('#moreInfo').html('- Less Info');
      }else{
        $('.commisionFreeContainer p').removeClass('show').addClass('hide');
        $('#moreInfo').html('+ More Info');
      }
    });
  });

// function expandIt() {
// if ($( ".commisionFreeContainer p" ).hasClass('hide')){
//     $('.commisionFreeContainer p').removeClass('hide').addClass('show');
//     $('#moreInfo').html('- Less Info');
//   }else{
//     $('.commisionFreeContainer p').removeClass('show').addClass('hide');
//     $('#moreInfo').html('+ More Info');
//   }
// }