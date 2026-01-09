(function () {
  const rightCloud = document.querySelector(".cloud-right");
  if (!rightCloud) return;

  const enable = () => document.body.classList.add("rainbow-mode");
  const disable = () => document.body.classList.remove("rainbow-mode");

  rightCloud.addEventListener("mouseenter", enable);
  rightCloud.addEventListener("mouseleave", disable);

  rightCloud.addEventListener("touchstart", (e) => {
    e.preventDefault();
    document.body.classList.toggle("rainbow-mode");
  }, { passive: false });
})();

(function () {
  const leftCloud = document.querySelector(".cloud-left");
  if (!leftCloud) return;

  let overlay = document.getElementById("lightning-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "lightning-overlay";
    document.body.appendChild(overlay);
  }

  let stormActive = false;
  let lightningTimer = null;

  function flashLightning() {
    const x = Math.floor(10 + Math.random() * 80);
    const y = Math.floor(10 + Math.random() * 60);
    overlay.style.background = `radial-gradient(circle at ${x}% ${y}%,
      rgba(255,255,255,0.95),
      rgba(255,255,255,0.35) 35%,
      rgba(255,255,255,0.0) 70%)`;

    overlay.classList.remove("flash");
    void overlay.offsetWidth;
    overlay.classList.add("flash");
  }

  function scheduleLightning() {
    if (!stormActive) return;

    const delay = Math.floor(400 + Math.random() * 1400);
    lightningTimer = setTimeout(() => {
      if (stormActive && Math.random() < 0.6) flashLightning();

      if (stormActive && Math.random() < 0.2) {
        setTimeout(() => stormActive && flashLightning(), 120 + Math.random() * 180);
      }

      scheduleLightning();
    }, delay);
  }

  function enableStorm() {
    stormActive = true;
    document.body.classList.add("storm-mode");

    scheduleLightning();
  }

  function disableStorm() {
    stormActive = false;
    document.body.classList.remove("storm-mode");

    if (lightningTimer) {
      clearTimeout(lightningTimer);
      lightningTimer = null;
    }
  }

  leftCloud.addEventListener("mouseenter", enableStorm);
  leftCloud.addEventListener("mouseleave", disableStorm);

  leftCloud.addEventListener("touchstart", (e) => {
    e.preventDefault();
    if (stormActive) disableStorm();
    else enableStorm();
  }, { passive: false });
})();

console.log("%c// Some secrets are meant to be hovered", "color:#7aa89a;");