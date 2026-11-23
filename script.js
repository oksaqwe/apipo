onload = () => {
  // ====== EDIT: your photo file names (they repeat if there are more flowers than photos) ======
  const PHOTOS = [
    "photo1.jpg", "photo2.jpg", "photo3.jpg",
    "photo4.jpg", "photo5.jpg", "photo6.jpg",
  ];
  // ===========================================================================================

  document.querySelectorAll(".flower__photo img").forEach((img, i) => {
    img.addEventListener("error", () => img.remove()); // no broken-image icon
    img.src = PHOTOS[i % PHOTOS.length];
  });

  // Background music
  const music = new Audio("flower.mp3");
  music.loop = true;
  music.volume = 0.7;

  const startAnimation = () => document.body.classList.remove("container");

  // Try real autoplay first (works only if the browser allows it)
  music.play().then(startAnimation).catch(() => {
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
      startAnimation();
      overlay.remove();
    });
  });
};