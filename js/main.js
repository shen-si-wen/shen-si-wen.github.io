let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

let vw = window.innerWidth * 0.01;
document.documentElement.style.setProperty('--vw', `${vw}px`);

function checkOrientation() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  let vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty('--vw', `${vw}px`);

  const overlay = document.getElementById("rotate-overlay");

  if (window.innerHeight > window.innerWidth) {
    overlay.style.display = "flex";
  } else {
    overlay.style.display = "none";
  }
}

window.addEventListener("load", checkOrientation);
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);
document.addEventListener("DOMContentLoaded", checkOrientation);


const content = document.querySelector(".content");
const buttons = document.querySelectorAll(".sidebar button");
const sections = document.querySelectorAll("section");


fetch('data.json')
  .then(res => res.text())
  .then(jsonStr => {
    const assets = JSON.parse(jsonStr);
    const images = assets["images"];

    sections.forEach(section => {
      const type = section.id;
      
      if (images.hasOwnProperty(type)) {
        const works = images[type];
        const gallery = section.querySelector(".gallery");

        for (const work in works) {
          const itemData = works[work];

          const item = document.createElement("div");
          item.classList.add("item");

          const img = document.createElement("img");
          img.src = "assets/" + itemData.image;
          img.alt = work;
          item.appendChild(img);

          fetch("assets/" + itemData.text)
            .then(res => res.text())
            .then(textContent => {

              const formattedHtml = textString.replace(/\n/g, '<br>');
              document.getElementById('output').innerHTML = formattedHtml;

              const p = document.createElement("p");
              p.textContent = textContent;
              item.appendChild(p);
            })
            .catch(err => {
              console.error(`Failed to load text file ${itemData.text}:`, err);
            });

          gallery.appendChild(item);
        }
      }
    });
  })
  .catch(err => console.error(err));

function updateSizes() {

  const contentRect = content.getBoundingClientRect();

  for (let i = 0; i < sections.length; i++) {
    const sectionRect = sections[i].getBoundingClientRect();

    const overlap = Math.max(
      0,
      Math.min(contentRect.bottom, sectionRect.bottom) -
      Math.max(contentRect.top, sectionRect.top)
    );

    buttons[i].style.aspectRatio =
      "5/" + (1 + overlap / contentRect.height);
  }
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
  