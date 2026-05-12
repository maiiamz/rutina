let song;
let started = false;

function preload() {
  song = loadSound('./audio/Copyright-Free-Creepy-Music-Haunted-by-Ross-Bugden.mp3');
}

function setup() {
  noCanvas();

  const slider = document.getElementById('volumeSlider');
  const label = document.getElementById('volumeLabel');

  slider.addEventListener('input', () => {
    const val = parseFloat(slider.value);
    label.textContent = Math.round(val * 100) + '%';
    if (song) song.setVolume(val);
  });
}

function mousePressed() {
  if (!started) {
    song.loop();
    song.setVolume(1);
    song.play();
    started = true;
  }
}