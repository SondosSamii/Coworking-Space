function toggleLoader(loaderId) {
  document.getElementById(loaderId).classList.toggle("visible");
  document.body.style.overflowY = "visible";
}

window.onload = () => {
  toggleLoader("loader");
  let cities = [];
  fetchCities();
};

$(".owl-carousel").owlCarousel({
  loop: true,
  dots: false,
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
    const fade = setInterval(() => {
      for (let i = 0; i < maxUpdates; i++) {
        hiddenUpdates[i].classList.remove("hidden");
        clearInterval(fade);
      }
    }, 300);
  }, 3000);
}

function fetchCities() {
  fetch("cities.json")
    .then((res) => res.json())
    .then((data) => {
      cities = data;
      makeCityOptions(cities);
    })
    .catch((err) => console.error(err));
}

function makeCityOptions(data) {
  const citiesMenu = document.getElementById("cities");
  data.forEach((city) => {
    let option = document.createElement("option");
    option.appendChild(document.createTextNode(city.name));
    option.setAttribute("value", city.id);
    citiesMenu.appendChild(option);
  });
}

function getLocation(e) {
  const city = cities.filter((city) => city.id == e.target.value)[0];
  document.getElementById("location").classList.add("d-none");
  document.getElementById("viewBtn").classList.remove("d-none");
  document.getElementById("locationModalLabel").innerHTML = city.name;
  document.getElementById("locationFrame").setAttribute("src", city.location);
}

const myModalEl = document.getElementById("locationModal");
myModalEl.addEventListener(
  "show.bs.modal",
  function (event) {
    window.scrollTo(0, 0);
  },
  { passive: true }
);

myModalEl.addEventListener(
  "hidden.bs.modal",
  function (event) {
    document.body.style.overflowY = "visible";
  },
  { passive: true }
);
