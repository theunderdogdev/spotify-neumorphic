$(document).ready(function () {
  const songs = [
    "alone pt 2",
    "crowd control",
    "fake a smile",
    "unity",
    "warriyo mortals",
  ];

  const loadMetadata = () => {
    jsmediatags.read(`http://127.0.0.1:5500/songs/${songs[iter]}.mp3`, {
      onSuccess: function (tag) {
        let picture = tag.tags.picture;
        var base64String = "";
        for (var i = 0; i < picture.data.length; i++) {
          base64String += String.fromCharCode(picture.data[i]);
        }
        var imageUri =
          "data:" + picture.format + ";base64," + window.btoa(base64String);
        $(".cover-art").attr("src", imageUri);
        $("#np-title").text(tag.tags.title);
        $("#np-artist").text(tag.tags.artist);
        console.log(tag.tags.album, tag.tags.artist, tag);
      },
      onError: function (error) {
        console.log(error);
      },
    });
  };

  const guardFlow = () => {
    iter < songs.length - 1
      ? $("#skipfwd").prop("disabled", false)
      : $("#skipfwd").prop("disabled", true);
    iter > 0
      ? $("#skipbck").prop("disabled", false)
      : $("#skipbck").prop("disabled", true);
  };

  const timeFuncs = () => {
    let playtime;
    let tracktime =
      Math.round(player.duration) - 60 * Math.floor(player.duration / 60);
    tracktime = tracktime > 10 ? tracktime : "0" + tracktime.toString();
    $("#track-time").text(`${Math.floor(player.duration / 60)}:${tracktime}`);

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
  let iter = 1;
  let player = new Audio(`./songs/${songs[iter]}.mp3`);
  // let player = new Audio(`./songs/${songs[0]}.mp3`);
  console.log("Jquery Ready");

  $(".nav-item").click(function () {
    $(".nav-item.active").removeClass("active");
    $(this).addClass("active");
    $(".viewing").fadeOut(500).removeClass("viewing");
    console.log($(this).attr("data-view"));
    $(`.${$(this).attr("data-view")}`)
      .fadeIn(500)
      .addClass("viewing");
  });

  $(".now-playing").click(function () {
    $(this).addClass("fscreen");
  });
  player.currentTime = 180;
  $("#collapse-fscreen").click(function (e) {
    e.stopPropagation();
    $(".now-playing").removeClass("fscreen");
  });
  loadMetadata();
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
      loadMetadata();
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
      loadMetadata();
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
  $("#search").on("input", function () {
    if ($(this).val() != "") {
      $(".clear").attr("disabled", false);
    } else {
      $(".clear").attr("disabled", true);
    }
  });
  $(".clear").click(function () {
    $("#search").val("");
    $(this).attr("disabled", true);
  });

  $(".data-assets .controller").click(function () {
    prevpos = $(".library").scrollTop();
    $(".playlists").css({
      transform: "translateX(-100vw)",
    });
    $(".libray").animate({ scrollTop: 0 }, 300);
    $(".playlist-content")
      .css({
        transform: "translateX(0px)",
      })
      .addClass("isactive");
    $(".subcontroller.back-btn");
  });
  $(".subcontroller.back-btn").click(function () {
    $(".library").animate(
      {
        scrollTop: prevpos,
      },
      300
    );
    $(".subcontroller.back-btn");
    $(".playlists").css({
      transform: "translateX(0px)",
    });
    $(".playlist-content")
      .css({
        transform: "translateX(100vw)",
      })
      .removeClass("isactive");
  });

  // Profile View
  $("#edit-info").click(function () {
    console.log("hi");
    if ($("#edit-info.active").length == 0) {
      $(this).addClass("active");
      $(".profile.view.viewing input").attr("disabled", false);
    } else {
      $(this).removeClass("active");
      $(".profile.view.viewing input").attr("disabled", true);
    }
  });
});
