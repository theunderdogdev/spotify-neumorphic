$(document).ready(function () {
  const songs = [
    "2U_Justin_Bieber",
    "Alan_Walker_All_Falls_Down",
    "Alan_Walker_Alone",
    "Alan_Walker_Ava_Max_Alone_Pt_II",
    "Alan_Walker_Darkside",
  ];
  const guardFlow = () => {
    iter < songs.length - 1 ? $('#skipfwd').prop('disabled', false) : $('#skipfwd').prop('disabled', true);
    iter > 0 ? $('#skipbck').prop('disabled', false) : $('#skipbck').prop('disabled', true)
  }
  const timeFuncs = () => {
    let playtime;
    $("#track-time").text(
      `${Math.floor(player.duration / 60)}:${
        Math.round(player.duration) - 60 * Math.floor(player.duration / 60)
      }`
    );

    player.ontimeupdate = () => {
      $(".tracker").width(`${(player.currentTime * 100) / player.duration}%`);
      playtime = Math.round(player.currentTime);
      if (playtime < 60) {
        if (playtime < 10) {
          playtime = `0:0${playtime}`;
        } else {
          playtime = `0:${playtime}`;
        }
      } else {
        if (playtime - 60 * Math.floor(playtime / 60) < 10) {
          playtime = `${Math.floor(playtime / 60)}:0${
            playtime - 60 * Math.floor(playtime / 60)
          }`;
        } else {
          playtime = `${Math.floor(playtime / 60)}:${
            playtime - 60 * Math.floor(playtime / 60)
          }`;
        }
      }
      $("#playtime").text(playtime);
    };
    console.log(player.duration, player);
  };
  let iter = 0;

  let player = new Audio(`./songs/${songs[0]}.mp3`);
  console.log("Jquery Ready");

  $(".nav-item").click(function () {
    $(".nav-item.active").removeClass("active");
    $(this).addClass("active");
    $('.viewing').fadeOut(500).removeClass('viewing');
    console.log($(this).attr('data-view'));
    $(`.${$(this).attr('data-view')}`).fadeIn(500).addClass('viewing');
  });

  $(".now-playing").click(function () {
    $(this).addClass("fscreen");
  });

  $("#collapse-fscreen").click(function (e) {
    e.stopPropagation();
    $(".now-playing").removeClass("fscreen");
  });

  $("#playbtn.controller").click(function (e) {
    e.stopPropagation();
    if ($(".play.paused").length == 0) {
      player.pause();
      $(".play").addClass("paused");
    } else {
      $(".play").removeClass("paused");
      player.play();
    }
    guardFlow();
    timeFuncs();
  });

  $("#skipfwd").click(function (e) {

    e.stopPropagation();
    player.pause();
    iter += 1;
    guardFlow();
    player.src = `./songs/${songs[iter]}.mp3`;
    player.load();

    setTimeout(() => {
      player.play();
      $(".play").removeClass("paused");
      timeFuncs();
    }, 750);
  });
  $("#skipbck").click(function (e) {

    e.stopPropagation();
    player.pause();
    iter -= 1;
    guardFlow();
    player.src = `./songs/${songs[iter]}.mp3`;
    player.load();

    setTimeout(() => {
      player.play();
      $(".play").removeClass("paused");
      timeFuncs();
    }, 750);
  });

  $("#like").click(function (e) {
    e.stopPropagation();
    $(this).toggleClass("pressed");
  });
  $("#report").click(function (e) {
    e.stopPropagation();
    $(this).toggleClass("pressed");
  });
  let prevpos;
  // Library View Controls
  $('.data-assets .controller').click(function () {
    prevpos = $('.library').scrollTop();
    $('.playlists').css({
      'transform': 'translateX(-100vw)'
    });
    $('.playlist-content').css({
      'transform': 'translateX(0px)'
    })
    $('.subcontroller.back-btn').addClass('isactive');
  })
  $('.subcontroller.back-btn').click(function () {
    $('.library').animate({
      scrollTop: prevpos
    }, 300);
    $('.subcontroller.back-btn').removeClass('isactive');
    $('.playlists').css({
      'transform': 'translateX(0px)'
    });
    $('.playlist-content').css({
      'transform': 'translateX(100vw)'
    });
  })

});