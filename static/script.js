import {
  homeViewTrends,
  homeRecents,
  searchTopGenres,
  generatePlaylist,
} from "./templates.js";
const dateTime = new Date();
let timeOfDay;

const generateRandomImageIndex = () => {
  return Math.floor(Math.random() * 6);
};
$(".greet").text();
$(document).ready(function () {
  setTimeout(() => {
    $("#loading")
      .css({ transform: "translateY(-100vh)" })
      .delay(2000)
      .queue((next) => {
        $("#loading").remove();
        next();
      });
  }, 5000);
  console.log(dateTime.getHours());
  if (dateTime.getHours() > 5 && dateTime.getHours() < 12) {
    timeOfDay = "Morning";
  } else if (dateTime.getHours() >= 12 && dateTime.getHours() <= 17) {
    timeOfDay = "Afternoon";
  } else if (dateTime.getHours() > 17 && dateTime.getHours() <= 20) {
    timeOfDay = "Evening";
  } else {
    timeOfDay = "Night";
  }
  $(".greet").text("Good " + timeOfDay);

  const songs = [
    "alone%20pt%202",
    "crowd%20control",
    "fake%20a%20smile",
    "unity",
    "warriyo%20mortals",
  ];
  /* UI Templates generation */
  const images = [
    "cover.jpeg",
    "cover2.jpeg",
    "cover3.jpeg",
    "cover4.jpeg",
    "cover5.jpeg",
    "cover6.jpeg",
    "cover7.jpeg",
  ];
  $(".tiles").append(
    homeViewTrends(images, [
      "Lorem Ipsum",
      "Lorem Ipsum",
      "Lorem Ipsum",
      "Lorem Ipsum",
      "Lorem Ipsum",
      "Lorem Ipsum",
    ])
  );
  for (let i = 0; i < 10; i++) {
    $("ul.recents").append(
      homeRecents(
        images[Math.floor(Math.random() * 6)],
        "Different World",
        "Lorem Ipsum Dol"
      )
    );
  }
  $("ul#top-genres")
    .append(
      searchTopGenres([
        images[generateRandomImageIndex()],
        images[generateRandomImageIndex()],
      ])
    )
    .append(
      searchTopGenres([
        images[generateRandomImageIndex()],
        images[generateRandomImageIndex()],
      ])
    );
  for (let i = 0; i < 10; i++) {
    $("ul#all-genres").append(
      searchTopGenres([
        images[generateRandomImageIndex()],
        images[generateRandomImageIndex()],
      ])
    );
  }
  for (let i = 0; i < 4; i++) {
    $("ul.playlists").append(
      generatePlaylist(
        images[Math.floor(Math.random() * 6)],
        "Some Heading",
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus,facilis."
      )
    );
  }
  const closeAlert = () => {
    $(".alert.alerting").removeClass("alerting");
  };
  /* UI Templates generation */

  /* Music Meta Data Part */

  const loadMetadata = () => {
    jsmediatags.read(
      `http://${window.location.hostname}:${window.location.port}/songs/${songs[iter]}.mp3`,
      {
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
      }
    );
  };
  /* Music Meta Data Part */

  /* Music Control Part */

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
  let iter = 0;
  let player = new Audio(`/songs/${songs[iter]}.mp3`);

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
    player.src = `/songs/${songs[iter]}.mp3`;
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
    player.src = `/songs/${songs[iter]}.mp3`;
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
  $("#search").on("input", function () {
    if ($(this).val() != "") {
      $(".clear").attr("disabled", false);
    } else {
      $(".clear").attr("disabled", true);
    }
  });
  // $("#search")
  //   .focus(function () {
  //     $("#user-genres-choice").fadeOut(500);
  //   })
  //   .blur(function () {
  //     $("#user-genres-choice").fadeIn(500);
  //   });
  $(".clear").click(function () {
    $("#search").val("");
    $(this).attr("disabled", true);
  });

  $(".data-assets .controller").click(function () {
    $(".user-library").css({ transform: "translateX(-100vw)" });
    $(".playlist-content .cover img").attr(
      "src",
      "./images/" + $(this).attr("data-image")
    );
    $(".playlist-content")
      .css({ transform: "translateX(0px)" })
      .addClass("isactive");
    $(".subcontroller.back-btn");
  });
  $(".subcontroller.back-btn").click(function () {
    $(".subcontroller.back-btn");
    $(".user-library").css({ transform: "translateX(0px)" });
    $(".playlist-content")
      .css({ transform: "translateX(100vw)" })
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

  $("#save-info").click(function () {
    $(".alert").addClass("alerting");
    setTimeout(closeAlert, 2000);
  });

  // $(".activatemisc").click(function () {
  //   $("#misc").addClass("active");
  // });
  // $("#misc .subcontroller").click(function () {
  //   $("#misc").removeClass("active");
  // });
});
