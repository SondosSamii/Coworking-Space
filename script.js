function toggleLoader(loaderId) {
  document.getElementById(loaderId).classList.toggle("visible");
  document.body.style.overflowY = "visible";
}

window.onload = () => {
  toggleLoader("loader");
};

$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  responsive: {
    0: {
      items: 1.25,
    },
    500: {
      items: 1.5,
    },
    768: {
      items: 1.7,
    },
    992: {
      items: 1.35,
      margin: 20,
    },
  },
});

function toggleParagraph(e) {
  const par = e.target.parentNode.querySelector(".sub-header p");

  par.classList.contains("hide-overflow")
    ? (e.target.innerHTML = "Read Less")
    : (e.target.innerHTML = `Read More <i class="fa-solid fa-arrow-right-long" aria-hidden="true"></i>`);
  par.classList.toggle("hide-overflow");
}

let maxUpdates = 4;

function moreUpdates(e) {
  toggleLoader("more-loader");
  setTimeout(() => {
    toggleLoader("more-loader");
    const hiddenUpdates = document.querySelectorAll(
      ".updates-grid .update.hidden"
    );
    if (hiddenUpdates.length < maxUpdates) {
      maxUpdates = hiddenUpdates.length;
      e.target.style.display = "none";
    }
    for (let i = 0; i < maxUpdates; i++) {
      hiddenUpdates[i].classList.remove("hidden");
    }
  }, 3000);
}
