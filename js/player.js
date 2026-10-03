/* =========================================================
   VIDEO PLAYER
   ========================================================= */

let currentVideo = null;

const playerBar = document.getElementById("playerBar");
const timeline = document.getElementById("timeline");
const playPause = document.getElementById("playPause");


/* ---------------------------------------------------------
   LOCAL VIDEO FILES
   Only run this code on wrappers that actually contain
   a <video> element.
   --------------------------------------------------------- */

document.querySelectorAll(".video-wrapper video").forEach(video => {

  const wrapper = video.closest(".video-wrapper");
  const src = wrapper.dataset.video;

  if (!src) return;

  /* Safari / iPhone setup */
  video.src = src;
  video.preload = "metadata";
  video.playsInline = true;
  video.muted = true;

  video.load();


  /* Force browser to render first frame */
  video.addEventListener("loadedmetadata", () => {

    video.currentTime = 0;

    video.play()
      .then(() => {
        video.pause();
        video.currentTime = 0;
      })
      .catch(() => {});

  }, { once: true });


  /* Click video */
  wrapper.addEventListener("click", () => {

    /* Pause previous video */
    if (currentVideo && currentVideo !== video) {
      currentVideo.pause();
      currentVideo.currentTime = 0;
    }


    if (video.paused) {

      /* Unmute only after user interaction */
      video.muted = false;

      video.play();

      currentVideo = video;

      if (playerBar) {
        playerBar.style.display = "flex";
      }

      if (playPause) {
        playPause.textContent = "⏸";
      }

    } else {

      video.pause();

      if (playPause) {
        playPause.textContent = "▶";
      }

    }

  });


  /* Update timeline */
  video.addEventListener("timeupdate", () => {

    if (!timeline || !video.duration) return;

    timeline.value =
      (video.currentTime / video.duration) * 100;

  });


  /* Video ended */
  video.addEventListener("ended", () => {

    if (playPause) {
      playPause.textContent = "▶";
    }

  });

});


/* ---------------------------------------------------------
   TIMELINE
   --------------------------------------------------------- */

if (timeline) {

  timeline.addEventListener("input", () => {

    if (!currentVideo || !currentVideo.duration) return;

    currentVideo.currentTime =
      (timeline.value / 100) * currentVideo.duration;

  });

}


/* ---------------------------------------------------------
   PLAY / PAUSE BUTTON
   --------------------------------------------------------- */

if (playPause) {

  playPause.addEventListener("click", () => {

    if (!currentVideo) return;


    if (currentVideo.paused) {

      currentVideo.play();
      playPause.textContent = "⏸";

    } else {

      currentVideo.pause();
      playPause.textContent = "▶";

    }

  });

}


/* =========================================================
   DARK SECTION
   ========================================================= */

/*
   The presence of #works determines whether the page
   has a dark scrolling section.

   Therefore:
   - Portfolio → dark
   - Natural Worlds → dark
   - Electronic/Synth → dark
   - Movies/Videos → dark
   - Contact → stays light
*/

const worksSection = document.getElementById("works");


if (worksSection) {

  function updateDarkSection() {

    const worksTop =
      worksSection.getBoundingClientRect().top;


    if (worksTop <= 150) {

      document.body.classList.add("dark-section");

    } else {

      document.body.classList.remove("dark-section");

    }

  }


  /* Check immediately */
  updateDarkSection();


  /* Check while scrolling */
  window.addEventListener("scroll", updateDarkSection);

}
