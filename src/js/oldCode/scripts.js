
$(function(){
  // Адрес ссылки для AJAX
  let zeroLink = BX.message("ZEROLINK");

  // daterangepicker на поле с интервалом дат
  $('#dataSob').daterangepicker();

  $('#mainForm').on('click', '.searchButton', function(){
    let sData = $('#mainForm').serialize();
    sData += '&action=' + $(this).val();

    console.log(sData)

    $.ajax({
      type: "POST",
      url: zeroLink,
      data: sData,
      success: function( res ){
        $('.data').remove();
        $( res ).insertAfter('#insertPlace');
      },
      error: function( res ){
        console.log('error get data from server');
      }
    })

  })

});
