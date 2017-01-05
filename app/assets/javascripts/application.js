// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$(document).ready(function() {

  $('#submit').on('click', function (event) {
    event.preventDefault();
    console.log('whatsup');

    $.ajax({
      method: 'POST',
      url: "/articles",
      dataType: 'JSON',
      data: { article: {text: "adlfsj"}},
      success: function (data) {
        console.log('hey');
      },
      error: function() {
        console.log('fail');
      }
    });

  })

  

});

$(".cr_sectshow").on("submit", "form", function (e) {
    e.preventDefault();
    $(".cr_sectshow").bPopup().close()

    var link = $(this).attr("action");
    var data = $(this).serialize();


    var request = $.ajax({url: link, data: data, type: "post", dataType: "JSON"});

      request.done(function(data){
        $(".sect_show").append(data)
    var new_link = "<li><a href=/sections/" + data.id + ">"+ data.section + "</li>";
        $("ul").prepend(new_link);
        $("form").find("input[type=text]").val("")


      });

  });
});



