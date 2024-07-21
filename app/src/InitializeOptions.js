import * as Constants from "./Constants.js";
import SelectCustom from "./CustomComponents/SelectCustom.js";
import DateCustom from "./CustomComponents/DateCustom.js";
//TODO intialize current date with months lookbook for current year
let date = new Date();
let currMonth = date.getMonth();
let currYear = date.getFullYear();

function main() {
  let continents = document.querySelector("#continents");
  continents.addOptions(Constants.CONTINENTS);

  //Add day and night selectors
  document.querySelectorAll(Constants.SELECTORS.DAY_NIGHT).forEach((x) => {
    let optionday = document.createElement("option");
    optionday.innerHTML = "day";
    x.appendChild(optionday);
    let optionnight = document.createElement("option");
    optionnight.innerHTML = "night";
    x.appendChild(optionnight);
  });
  //Add anomaly options
  document.querySelectorAll(Constants.SELECTORS.PRODUCT_LAYER).forEach((x) => {
    Object.values(Constants.ANOMALYMAPPING).forEach(({ name, satellites }) => {
      let option = document.createElement("option");
      option.innerHTML = name;
      x.appendChild(option);
    });
    x.addEventListener("change", displayDayNight);
    x.addEventListener("change", displaySat);
    let event = new Event("change");
    x.dispatchEvent(event);
  });
  document.querySelector(Constants.SELECTORS.ENABLE_ANIMATE).checked = false;
  document.querySelectorAll(Constants.SELECTORS.VISIBLE).forEach((x) => {
    x.checked = false;
  });
}

function displaySat(event) {
  let anomalyObj = event.target;
  let parentNode = anomalyObj.parentNode;
  let satelliteObj = parentNode.querySelector(Constants.SELECTORS.SATELLITE);
  let { satellites } = Object.values(Constants.ANOMALYMAPPING).find(
    ({ name }) => {
      return name === anomalyObj.value;
    }
  );
  satelliteObj.innerHTML = "";
  satellites.forEach((satellite) => {
    let element = document.createElement("option");
    element.innerHTML = satellite;
    satelliteObj.appendChild(element);
  });
  if (satellites.length === 1) {
    satelliteObj.style.display = "none";
  } else {
    satelliteObj.style.display = "block";
  }
}

function displayDayNight(event) {
  let anomalyObj = event.target;
  let parentNode = anomalyObj.parentNode;
  let daynightObj = parentNode.querySelector(Constants.SELECTORS.DAY_NIGHT);
  if (hasDayNightFeature(anomalyObj.value)) {
    daynightObj.style.display = "block";
  } else {
    daynightObj.style.display = "none";
  }
}

function hasDayNightFeature(value) {
  let { hasDayNight } = Object.values(Constants.ANOMALYMAPPING).find(
    ({ name }) => {
      return name === value;
    }
  );
  if (hasDayNight) {
    return true;
  }

  return false;
}

main();
