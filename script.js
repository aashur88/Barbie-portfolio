// === Hide Loader on Page Load ===
window.addEventListener("load", () => {
  document.querySelector(".loader-wrapper").style.display = "none";
});

// === Move Custom Cursor ===
const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});

// === Glitter Cursor Trail ===
const trailCount = 15;
const trailElements = [];

for (let i = 0; i < trailCount; i++) {
  const trail = document.createElement("div");
  trail.classList.add("cursor-trail");
  document.body.appendChild(trail);
  trailElements.push(trail);
}

let mouseX = 0,
  mouseY = 0;
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

gsap.to(
  {},
  {
    duration: 0.016,
    repeat: -1,
    onRepeat: () => {
      let x = mouseX;
      let y = mouseY;

      trailElements.forEach((trail, index) => {
        gsap.to(trail, {
          x: x - 5,
          y: y - 5,
          opacity: 1 - index * (1 / trailCount),
          duration: 0.3,
        });

        x += (trailElements.length - index) * 0.5;
        y += (trailElements.length - index) * 0.5;
      });
    },
  }
);

// === Sparkles on Click with GSAP ===
document.addEventListener("click", (e) => {
  const sparkleCount = 10;
  for (let i = 0; i < sparkleCount; i++) {
    const sparkle = document.createElement("div");
    sparkle.classList.add("cursor-trail"); // reuse glitter style
    document.body.appendChild(sparkle);

    sparkle.style.left = `${e.clientX}px`;
    sparkle.style.top = `${e.clientY}px`;

    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 80 + 20;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    gsap.to(sparkle, {
      x: x,
      y: y,
      opacity: 0,
      scale: 0,
      rotation: Math.random() * 720,
      duration: 1.5,
      ease: "power2.out",
      onComplete: () => sparkle.remove(),
    });
  }
});

// === Sparkles on Scroll ===
window.addEventListener("scroll", () => {
  const sparkle = document.createElement("div");
  sparkle.classList.add("scroll-sparkle");
  sparkle.style.left = Math.random() * window.innerWidth + "px";
  document.body.appendChild(sparkle);

  gsap.to(sparkle, {
    y: window.innerHeight,
    opacity: 0,
    duration: 2 + Math.random(),
    ease: "power1.out",
    onComplete: () => sparkle.remove(),
  });
});

// === VanillaTilt for 3D Cards ===
VanillaTilt.init(document.querySelectorAll(".tilt-card, .project-card"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.2,
});
