$(document).ready(function(){

    $('form').on('submit', function(){

        var x = $(this).serialize();
  
        $.ajax({
          type: 'POST',
          url: '/',
          data: x,
          success: function(data){
            //do something with the data via front-end framework
            location.reload();
          }
        });
  
        return false;
  
    });
  
    $('li').on('click', function(){
  
      // console.log("Clicked!!");
  
        var item = $(this).text().trim().replace(/ /g, "-");
        $.ajax({
          type: 'DELETE',
          url: '/todo/' + item,
          success: function(data){
            //do something with the data via front-end framework
            location.reload();
          }
        });
    });
  
  });
  