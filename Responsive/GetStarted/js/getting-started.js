
$(document).ready(function() {

    $('form input[name=brokerage]').change(function(){
      $('.commisionFreeContainer p').removeClass('hide').addClass('show');
      $('#moreInfo').html('- Less Info');
    });

    $( "#moreInfo" ).click(function() {
      if ($( ".commisionFreeContainer p" ).hasClass('hide')){
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