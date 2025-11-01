// 🌐 Navbar Toggle + Animation
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      navLinks.style.transition = "all 0.4s ease-in-out";
    });
  }

  // Dashboard animation (fade-up)
  document.querySelectorAll(".glass").forEach((card, index) => {
    setTimeout(() => card.classList.add("fade-up"), index * 150);
  });
});
