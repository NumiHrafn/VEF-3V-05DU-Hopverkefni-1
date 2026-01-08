/* NAV BAR TOGGLE */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

/* SCROLL FADE-IN */
const fadeSections = document.querySelectorAll(".fade-section");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    { threshold: 0.2 }
);

fadeSections.forEach(section => observer.observe(section));

/* FIRELIES */
const canvas = document.getElementById('firefly-canvas');
const ctx = canvas.getContext('2d');
let width, height, fireflies = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Firefly {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.brightness = Math.random() * 0.5 + 0.5;
        this.flickerSpeed = Math.random() * 0.05;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        this.brightness += Math.sin(Date.now() * this.flickerSpeed) * 0.01;
        this.brightness = Math.max(0.2, Math.min(this.brightness, 1));
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 252, 220, ${this.brightness})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ffffaa';
        ctx.fill();
    }
}

for (let i = 0; i < 50; i++) {
    fireflies.push(new Firefly());
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    fireflies.forEach(f => {
        f.update();
        f.draw();
    });
    requestAnimationFrame(animate);
}

animate();

/* RANDOM MESSAGE BUTTON (ALWAYS REPLAYS ANIMATION) */
const messageBtn = document.getElementById("messageBtn");
const messageBox = document.getElementById("messageBox");

if (
    messageBtn &&
    messageBox &&
    Array.isArray(window.profileMessages)
) {
    messageBtn.addEventListener("click", () => {
        const messages = window.profileMessages;
        const randomIndex = Math.floor(Math.random() * messages.length);

        // Remove animation class completely
        messageBox.classList.remove("pop");

        // Force browser to reset animation state
        void messageBox.offsetWidth;

        // Set new message
        messageBox.textContent = messages[randomIndex];

        // Re-add animation
        messageBox.classList.add("pop");
    });
}

