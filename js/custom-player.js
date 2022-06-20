const video = document.querySelector('.video');
const playBtn = document.querySelector('.player__btn');
const playBtnControl = document.querySelector('.play-btn');
const player = document.querySelector('.video');
const volumeControl = document.querySelector('.volume-bar');
const muteBtn = document.querySelector('.volume-mute-btn');
const progressBar = document.querySelector('.progress-bar');
const playerPoster = document.querySelector('.player-poster');

let isPlay = false;
let prevVolume = video.volume;
let value;

function playVideo() {
  playBtn.classList.add('player__btn_hide');
  playerPoster.classList.add('player-poster_hide');
  playBtnControl.style.backgroundImage = 'url("../assets/svg/pause.svg")';
  playBtnControl.setAttribute('data-play-btn', 'play');
  isPlay = true;

  video.play();
}

function pauseVideo() {
  playBtn.classList.remove('player__btn_hide');
  playBtnControl.style.backgroundImage = 'url("../assets/svg/play.svg")';
  playBtnControl.setAttribute('data-play-btn', 'play');
  isPlay = false;

  video.pause();
}

function videoVolume() {
  value = volumeControl.value;
  volumeControl.setAttribute('style', `background: -webkit-linear-gradient(0deg, #BDAE82 0%, #BDAE82 ${value}%, #FFFFFF ${value}%, #FFFFFF 100%);`);
  video.volume = value / 100;

    if(value == 0) {
      prevVolume = 0.1;
      muteBtn.style.backgroundImage = 'url("../assets/svg/mute.svg")';
    } else {
      muteBtn.style.backgroundImage = 'url("../assets/svg/volume.svg")';
    }
}

function muteVideo() {
  video.volume = 0;
  muteBtn.style.backgroundImage = 'url("../assets/svg/mute.svg")';
}

function unMuteVideo() {
  video.volume = prevVolume;
  muteBtn.style.backgroundImage = 'url("../assets/svg/volume.svg")';
}

function showProgress() {
  let current = (video.currentTime / video.duration) * 100;
    
  progressBar.value = current;
  progressBar.setAttribute('style', `background: -webkit-linear-gradient(0deg, #BDAE82 0%, #BDAE82 ${current}%, #FFFFFF ${current}%, #FFFFFF 100%);`);
}

function rewindVideo(time) {
  if (isPlay) {
    pauseVideo();
    video.currentTime = video.duration * time;
    playVideo();
  } else {
    pauseVideo();
    video.currentTime = video.duration * time;
  }
}

playBtn.addEventListener('click', () => {
  playVideo();
});

playBtnControl.addEventListener('click', () => {
  if (isPlay) {
    pauseVideo();
  } else {
    playVideo();
  }
});

player.addEventListener('click', () => {
  pauseVideo();
});

volumeControl.addEventListener('input', () => {
  videoVolume();
});

muteBtn.addEventListener('click', () => {
  if (video.volume == 0) {
    unMuteVideo();
  } else {
    muteVideo();
  }
});

video.addEventListener('timeupdate', () => {
  showProgress();
});

progressBar.addEventListener('click', (event) => {
  let point = event.clientX - progressBar.offsetLeft;
  let time =  point / progressBar.offsetWidth;

  rewindVideo(time);
});