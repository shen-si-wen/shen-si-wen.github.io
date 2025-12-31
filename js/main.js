document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      document
        .querySelector(link.getAttribute("href"))
        .scrollIntoView({ behavior: "smooth" });
    });
  });
  
  const btn = document.getElementById("home");
  const text = btn.querySelector(".img-button__text");
  
  //button.style.backgroundImage = "url('../assets/buttons/button-off.png')";

  btn.addEventListener("click", () => {
    const isOff = btn.classList.toggle("is-off");
  
    // Update accessible state
    btn.setAttribute("aria-pressed", isOff);
  
    // Update text
    // text.textContent = isOn ? "Sound: On" : "Sound: Off";
  });
  