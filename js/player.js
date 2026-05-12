
let currentVideo = null;

const playerBar = document.getElementById("playerBar");
const timeline = document.getElementById("timeline");
const playPause = document.getElementById("playPause");

document.querySelectorAll(".video-wrapper").forEach(wrapper => {
  const video = wrapper.querySelector("video");
  const src = wrapper.dataset.video;
  video.src = src;

  wrapper.addEventListener("click", () => {
    if (currentVideo && currentVideo !== video) {
      currentVideo.pause();
      currentVideo.currentTime = 0;
    }

    if (video.paused) {
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
    timeline.value = (video.currentTime / video.duration) * 100 || 0;
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

window.addEventListener('scroll', () => {
  const worksTop = worksSection.getBoundingClientRect().top;

  if (worksTop < window.innerHeight / 2) {
    // When the top of "works" is visible in the viewport
    document.body.classList.add('dark-section');
  } else {
    document.body.classList.remove('dark-section');
  }
});





