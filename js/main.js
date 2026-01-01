function checkOrientation() {
  const overlay = document.getElementById("rotate-overlay");

  if (window.innerHeight > window.innerWidth) {
    overlay.style.display = "flex";
  } else {
    overlay.style.display = "none";
  }
}

window.addEventListener("load", checkOrientation);
window.addEventListener("resize", checkOrientation);

const content = document.querySelector(".content");
const buttons = document.querySelectorAll(".sidebar button");
const sections = document.querySelectorAll("section");

let r = 0;

function updateSizes() {

  for (let i = 0; i < sections.length; i++) {
    r = Math.max(0, Math.min(content.scrollTop + content.offsetHeight, sections[i].offsetTop + sections[i].offsetHeight) - Math.max(content.scrollTop, sections[i].offsetTop));
    buttons[i].style.aspectRatio = "5/" + (1 + 2*r/content.offsetHeight);
    console.log(i, r / content.offsetHeight);
  }
  console.log(' ');
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.target;
    document.getElementById(id).scrollIntoView({
      behavior: "smooth"
    });
    updateSizes();
  });
});

updateSizes();
content.addEventListener("scroll", updateSizes);


// const observer = new IntersectionObserver(
//   entries => {
//     entries.forEach(entry => {
//       if (entry.intersectionRatio >=) {
//         currentSection = entry.target.id;

//         console.log(
//           entry.target.id,
//           entry.intersectionRatio
//         );

//         buttons.forEach(btn => {
//           btn.classList.toggle(
//             "active",
//             btn.dataset.target === currentSection
//           );
//         });

//         // currentSection now acts as your boolean indicator
//         // e.g. currentSection === "section2"
//       }
//     });
//   },
//   {
//     root: document.querySelector(".content"),
//     threshold: Array.from({ length: 101 }, (_, i) => i / 100)

//   }
// );

// sections.forEach(section => observer.observe(section));



  // const btn = document.getElementById("home");
  // const text = btn.querySelector(".img-button__text");
  
  // //button.style.backgroundImage = "url('../assets/buttons/button-off.png')";

  // btn.addEventListener("click", () => {
  //   const isOff = btn.classList.toggle("is-off");
  
  //   // Update accessible state
  //   btn.setAttribute("aria-pressed", isOff);
  
  //   // Update text
  //   // text.textContent = isOn ? "Sound: On" : "Sound: Off";
  // });
  