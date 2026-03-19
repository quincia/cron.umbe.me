// Theme toggle
const toggle = document.getElementById("theme-toggle");
const root = document.documentElement;

// Load saved theme
const saved = localStorage.getItem("theme") || (
  window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
);
root.dataset.theme = saved;

toggle?.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  localStorage.setItem("theme", next);
});

// Smooth anchor scrolling with offset (sticky header)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: "smooth" });
    }
  });
});

// Active TOC highlight on scroll
const tocLinks = document.querySelectorAll(".toc a");
if (tocLinks.length) {
  const headings = [...document.querySelectorAll(".post-content h2, .post-content h3")];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tocLinks.forEach(l => l.classList.remove("active"));
        const active = document.querySelector(`.toc a[href="#${entry.target.id}"]`);
        active?.classList.add("active");
      }
    });
  }, { rootMargin: "-20% 0% -70% 0%" });
  headings.forEach(h => observer.observe(h));
}

// Copy code button
document.querySelectorAll("pre").forEach(pre => {
  const btn = document.createElement("button");
  btn.textContent = "Copy";
  btn.className = "copy-btn";
  btn.style.cssText = `
    position:absolute; top:10px; right:10px;
    padding:4px 10px; font-size:0.75rem; cursor:pointer;
    background: var(--bg); border: 1px solid var(--border);
    color: var(--text-muted); border-radius: 4px;
    font-family: var(--font-mono); transition: all 200ms;
  `;
  pre.style.position = "relative";
  pre.appendChild(btn);
  btn.addEventListener("click", () => {
    navigator.clipboard.writeText(pre.querySelector("code")?.textContent || "").then(() => {
      btn.textContent = "✓ Copiato!";
      btn.style.color = "var(--accent-2)";
      setTimeout(() => { btn.textContent = "Copy"; btn.style.color = ""; }, 2000);
    });
  });
});
