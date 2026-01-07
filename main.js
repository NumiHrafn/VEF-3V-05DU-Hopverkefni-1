const btn = document.getElementById("factBtn");
const out = document.getElementById("factText");

btn.addEventListener("click", () => {
    const i = Math.floor(Math.random() * facts.length);
    out.textContent = facts[i];
});