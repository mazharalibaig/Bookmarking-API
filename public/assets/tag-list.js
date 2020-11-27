$(document).ready(function(){

    $('form').on('submit', function(){

        var x = $('form input').serialize();
  
        $.ajax({
          type: 'POST',
          url: '/tags',
          data: x,
          success: function(data){
            location.reload();
          }
        });
  
        return false;
  
    });
  
    $('li').on('click', function(){
  
        var tag = $(this).text().trim();

        $.ajax({
          type: 'DELETE',
          url: '/tags/' + tag,
          success: function(data){
            location.reload();
          }
        });
    });
  
  });
  