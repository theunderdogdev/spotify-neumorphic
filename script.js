$(document).ready(function () {
  console.log("Jquery Ready");
  $(".nav-item").click(function () {
    $(".nav-item.active").removeClass("active");
    $(this).addClass("active");
  });
});
