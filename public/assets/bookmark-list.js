$(document).ready(function(){

    $('form').on('submit', function(){

        var x = $('form input').serialize();

        $.ajax({
          type: 'POST',
          url: '/bookmarks',
          data: x,
          success: function(data){
            //do something with the data via front-end framework
            location.reload();
          }
        });
  
        return false;
  
    });
  
    $('li').on('click', function(){

        var x = $(this).text().trim().split("\n");

        $.ajax({
          type: 'DELETE',
          url: `/bookmarks/${x[0]}`,
          success: function(data){
            //do something with the data via front-end framework
            location.reload();
          }
        });
    });
  
  });
  