$(document).ready(function () {
  console.log("Jquery Ready");
  $(".nav-item").click(function () {
    $(".nav-item.active").removeClass("active");
    $(this).addClass("active");
  });
  $('.track-info').click(function(){
    $('.now-playing').addClass('fscreen');
  })
  $('#collapse-fscreen').click(function(){
    $('.now-playing').removeClass('fscreen');
  })
  $('.controller .play').click(function(){
    $(this).toggleClass('playing');
  })
});
