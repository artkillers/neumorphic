// Toggle Panel Settings
const settingsToggle = document.getElementById("settingsToggle");
const settingsPanel = document.getElementById("settingsPanel");

// Buka/tutup panel saat tombol di-klik
settingsToggle.addEventListener("click", (e) => {
  e.stopPropagation(); // mencegah event bubbling
  settingsPanel.classList.toggle("hidden");
});

// Tutup panel jika klik di luar
document.addEventListener("click", (e) => {
  if (!settingsPanel.contains(e.target) && !settingsToggle.contains(e.target)) {
    settingsPanel.classList.add("hidden");
  }
});

// Theme Toggle (dark / light)
const themeSelector = document.getElementById("themeSelector");
themeSelector.addEventListener("change", () => {
  const theme = themeSelector.value;
  document.body.classList.remove("dark", "light");
  document.body.classList.add(theme);
});

// Font Toggle (updates --font-main)
const fontSelector = document.getElementById("fontSelector");
fontSelector.addEventListener("change", () => {
  const font = fontSelector.value;
  document.documentElement.style.setProperty("--font-main", font);
});

// Color Swatch Toggle
document.querySelectorAll('.color-swatch').forEach(swatch => {
  swatch.addEventListener('click', () => {
    const colorClass = swatch.getAttribute("data-color");
    const colorValue = getComputedStyle(document.documentElement).getPropertyValue(`--${colorClass}`);
    document.documentElement.style.setProperty("--theme-color", colorValue.trim());

    // Highlight swatch aktif
    document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
    swatch.classList.add('active');
  });
});

// Neumorphic press effect
document.querySelectorAll('.neumorphic').forEach(el => {
  el.addEventListener('mousedown', () => el.classList.add('pressed'));
  el.addEventListener('mouseup', () => el.classList.remove('pressed'));
  el.addEventListener('mouseleave', () => el.classList.remove('pressed'));
});

const songs = [
  { title: "Karl Marx - Chill Vibes", src: "neumorphic-01.mp3" },
  { title: "Nietzsche - Night Drive", src: "neumorphic-02.mp3" },
  { title: "Plato - Mood Swing", src: "neumorphic-03.mp3" },
  { title: "Aristoteles - Last Day", src: "neumorphic-04.mp3" }
];

let currentSongIndex = 0;

const audio = new Audio();
const playBtn = document.getElementById("btnPlayPause");
const iconPlay = document.getElementById("iconPlay");
const iconPause = document.getElementById("iconPause");
const btnPrev = document.getElementById("btnPrev");
const btnNext = document.getElementById("btnNext");
const songTitle = document.getElementById("songTitle");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progressContainer");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  songTitle.textContent = song.title;
  audio.load();
}

function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    iconPlay.style.display = "none";
    iconPause.style.display = "inline";
  } else {
    audio.pause();
    iconPlay.style.display = "inline";
    iconPause.style.display = "none";
  }
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
  togglePlayPauseIcons(true);
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
  togglePlayPauseIcons(true);
}

function togglePlayPauseIcons(isPlaying) {
  iconPlay.style.display = isPlaying ? "none" : "inline";
  iconPause.style.display = isPlaying ? "inline" : "none";
}

// Update progress bar
audio.addEventListener("timeupdate", () => {
  const { currentTime, duration } = audio;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  // Time formatting
  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
});

progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
});

function formatTime(time) {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

audio.addEventListener("ended", nextSong);

// Init
loadSong(currentSongIndex);

// Events
playBtn.addEventListener("click", togglePlayPause);
btnPrev.addEventListener("click", prevSong);
btnNext.addEventListener("click", nextSong);

document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("selectstart", e => e.preventDefault());
document.addEventListener("copy", e => e.preventDefault());
