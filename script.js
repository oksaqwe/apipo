// ====== EDIT: your photo file names (they repeat if there are more flowers than photos) ======
const PHOTOS = [
  "photo1.jpg", "photo2.jpg", "photo3.jpg",
  "photo4.jpg", "photo5.jpg", "photo6.jpg",
];
const MUSIC_FILE = "flower.mp3";

// x = position (%), h = stem height (% of screen), p = photo size, lean = tilt (deg)
const FLOWERS = [
  { x: 16, h: 30, p: 26, lean: -4 },
  { x: 27, h: 55, p: 29, lean: 3 },
  { x: 38, h: 38, p: 27, lean: -3 },
  { x: 50, h: 62, p: 30, lean: 1 },
  { x: 62, h: 34, p: 26, lean: 3 },
  { x: 73, h: 57, p: 29, lean: -2 },
  { x: 84, h: 42, p: 27, lean: 4 },
];
// ===========================================================================================

const rand = (a, b) => Math.random() * (b - a) + a;
const $ = (id) => document.getElementById(id);
const make = (html, parent) => parent.insertAdjacentHTML("beforeend", html);

// Stars
for (let i = 0; i < 40; i++) {
  make(`<span class="star" style="--x:${rand(0, 100)}%;--y:${rand(0, 70)}%;--s:${rand(1, 3)}px;--t:${rand(1.5, 4)}s;--d:${rand(-3, 0)}s"></span>`, $("stars"));
}

// Hearts
for (let i = 0; i < 12; i++) {
  make(`<span class="heart" style="--x:${rand(2, 96)}%;--fs:${rand(14, 34)}px;--t:${rand(9, 16)}s;--d:${rand(-14, 0)}s;--dx:${rand(-8, 8)}vw">&#9829;&#xFE0E;</span>`, $("hearts"));
}

// Grass
const greens = [["#0b5a2e", "#2ee86b"], ["#14757a", "#39c6d6"], ["#0d6b34", "#42f27d"]];
for (let i = 0; i < 26; i++) {
  const [c1, c2] = greens[i % greens.length];
  make(`<span class="blade" style="--x:${(i / 26) * 100 + rand(-1, 1)}%;--w:${rand(2.2, 4.5)}vw;--h:${rand(7, 20)}vh;--c1:${c1};--c2:${c2};--gd:${rand(0.2, 2)}s;--t:${rand(2.5, 4.5)}s;--d:${rand(-4, 0)}s"></span>`, $("grass"));
}

// Flowers
FLOWERS.forEach((f, i) => {
  const gd = 0.3 + i * 0.35;
  const leaves = [1, 2, 3, 4, 5, 6].map((n) => `<i class="lf lf${n}"></i>`).join("");
  make(
    `<div class="flower" style="z-index:${100 - f.h};--x:${f.x}%;--h:${f.h}vh;--p:${f.p};--lean:${f.lean}deg;--gd:${gd}s;--bd:${(gd + 2.3).toFixed(2)}s;--sd:${(-i * 0.7).toFixed(1)}s">` +
      `<div class="line">${leaves}</div>` +
      `<div class="photo" style="--zd:${rand(-6, 0).toFixed(1)}s"><img alt=""></div></div>`,
    $("garden")
  );
});

document.querySelectorAll(".photo img").forEach((img, i) => {
  img.addEventListener("error", () => img.remove()); // no broken-image icon
  img.src = PHOTOS[i % PHOTOS.length];
});

// Music + start screen
const music = new Audio(MUSIC_FILE);
music.loop = true;
music.volume = 0.7;

const begin = () => document.body.classList.add("go");

music.play().then(begin).catch(() => {
  const overlay = document.createElement("div");
  overlay.style.cssText =
    "position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;" +
    "align-items:center;justify-content:center;gap:16px;background:#0b0b1e;" +
    "color:#fff;font-family:sans-serif;font-size:22px;cursor:pointer;text-align:center;" +
    "-webkit-tap-highlight-color:transparent;";
  overlay.innerHTML = '<div style="font-size:64px">🌸</div><div>Tap anywhere to start</div>';
  document.body.appendChild(overlay);

  // "click" works on both iPhone and Android
  overlay.addEventListener("click", () => {
    music.play().catch((err) => console.warn("Music not played:", err));
    begin();
    overlay.remove();
  });
});
