let currentVideo = null;

const playerBar = document.getElementById("playerBar");
const timeline = document.getElementById("timeline");
const playPause = document.getElementById("playPause");

document.querySelectorAll(".video-wrapper").forEach(wrapper => {

  const video = wrapper.querySelector("video");
  const src = wrapper.dataset.video;

  // iPhone/Safari setup
  video.src = src;
  video.preload = "metadata";
  video.playsInline = true;
  video.muted = true;

  video.load();

  // Force Safari to render first frame
  video.play().then(() => {
    video.pause();
    video.currentTime = 0;
  }).catch(() => {});

  wrapper.addEventListener("click", () => {

    // Pause previous video
    if (currentVideo && currentVideo !== video) {
      currentVideo.pause();
      currentVideo.currentTime = 0;
    }

    if (video.paused) {

      // IMPORTANT:
      // Unmute AFTER user interaction
      video.muted = false;

      video.play();

      currentVideo = video;

      playerBar.style.display = "flex";
      playPause.textContent = "⏸";

    } else {

      video.pause();
      playPause.textContent = "▶";
    }
  });

  video.addEventListener("timeupdate", () => {

    timeline.value =
      (video.currentTime / video.duration) * 100 || 0;

  });

  video.addEventListener("ended", () => {

    playPause.textContent = "▶";

  });

});

timeline.addEventListener("input", () => {

  if (!currentVideo) return;

  currentVideo.currentTime =
    (timeline.value / 100) * currentVideo.duration;

});

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
const worksSection = document.getElementById('works');

if (worksSection) {

window.addEventListener('scroll', () => {

  const worksTop = worksSection.getBoundingClientRect().top;

  if (worksTop < window.innerHeight / 2) {

    if (document.body.classList.contains("electronic-page")) {

      document.body.classList.add("electronic-section");

    } else {

      document.body.classList.add("dark-section");

    }

  } else {

    document.body.classList.remove("dark-section");
    document.body.classList.remove("electronic-section");

  }

});

}
