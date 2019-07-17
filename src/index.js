import "./styles.css";
import { getCity, getWeather } from "./forecast";

const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = ({ cityDetails, weather }) => {
  const { EnglishName } = cityDetails;
  const {
    WeatherText,
    Temperature: {
      Metric: { Value }
    }
  } = weather;

  details.innerHTML = `
  <h5 class="my-3">${EnglishName}</h5>
  <div class="my-3">${WeatherText}</div>
  <div class="display-4 my-4">
    <span>${Value}</span>
    <span>&deg;C</span>
  </div>
  `;

  // update night/day and icon image
  const iconSrc = `src/image/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = weather.IsDayTime ? "src/image/day.svg" : "src/image/night.svg";

  time.setAttribute("src", timeSrc);

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async city => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return {
    cityDetails,
    weather
  };
};

cityForm.addEventListener("submit", e => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset(); // clear all inputs

  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

  localStorage.setItem("city", city);
});

let city = localStorage.getItem("city");
if (city) {
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}
