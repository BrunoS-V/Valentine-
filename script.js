/* TEXTO DIGITANDO */
const text = "Eu te amo ❤";
let i = 0;
const typing = document.getElementById("typing");

function type() {
  if (i < text.length) {
    typing.innerHTML += text.charAt(i);
    i++;
    setTimeout(type, 150);
  }
}
type();

/* MÚSICA */
const playBtn = document.getElementById("playBtn");
const music = new Audio("freudian.mp3");

music.loop = true;
music.volume = 0;

let isPlaying = false;

/* FADE IN DO VOLUME */
function fadeInMusic() {
  let vol = 0;
  const fade = setInterval(() => {
    if (vol < 0.3) {
      vol += 0.02;
      music.volume = vol;
    } else {
      clearInterval(fade);
    }
  }, 150);
}

playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    music.play();
    fadeInMusic();

    // Atraso de 500ms (meio segundo) para a virada de cor ficar mais suave
    setTimeout(() => {
      document.body.classList.add("mood-shift");
    }, 500);

    playBtn.textContent = "⏸️";
    playBtn.classList.add("playing");

    setTimeout(() => {
      const surprise = document.getElementById("surprise");
      surprise.classList.add("show");
    }, 9000); 
  } else {
    music.pause();
    playBtn.textContent = "🎵";
    playBtn.classList.remove("playing");
    document.body.classList.remove("mood-shift");
    document.body.classList.remove("beat-pulse"); // Garante que o pulso pare no pause
  }
  isPlaying = !isPlaying;
});
/* CORAÇÕES / ESTRELAS CAINDO */
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = Math.random() > 0.5 ? "💙" : "✨";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 3 + 4 + "s";

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 7000);
}

setInterval(createHeart, 600);

/* BRILHO AO CLICAR */
document.addEventListener("click", (e) => {
  const spark = document.createElement("div");
  spark.classList.add("spark");
  spark.innerHTML = "💙";
  spark.style.left = e.clientX + "px";
  spark.style.top = e.clientY + "px";

  document.body.appendChild(spark);
  setTimeout(() => spark.remove(), 1000);
});

/* ACESSIBILIDADE */
playBtn.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    playBtn.click();
  }
});

const momentoDaBatida = 24.5; // O momento exato em que a batida entra

music.addEventListener("timeupdate", () => {
  // Ativa o pulso apenas se passar de 24.5s E a música estiver tocando
  if (music.currentTime >= momentoDaBatida && isPlaying) {
    document.body.classList.add("beat-pulse");
  } else {
    document.body.classList.remove("beat-pulse");
  }
});

