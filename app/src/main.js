import "./css/style.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "@fontsource/source-sans-pro";
import Map from "ol/Map.js";
import View from "ol/View.js";
import Overlay from "ol/Overlay";
import { defaults as defaultControls } from "ol/control.js";
import Attribution from "ol/control/Attribution.js";
import MousePosition from "ol/control/MousePosition.js";
import FullScreen from "ol/control/FullScreen.js";
import Download from "./Download.js";
import * as Constants from "./Constants.js";
import * as ProductLayers from "./ProductLayers.js";
import { createXYDirString, fillStringTemplate } from "./util.js";
import { initAnimationService } from "./Animation.js";

const currProj = "ESPG:4326";
const extent = [-180, -110, 180, 110];
const container = document.getElementById("popup");
const content = document.getElementById("popup-content");
const closer = document.getElementById("popup-closer");
const view = new View({
  projection: "EPSG:4326",
  extent: extent,
  center: [0, 0],
  zoom: 2,
  maxZoom: 8,
});
const overlay = new Overlay({
  element: container,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
});
let map = null;

let newAttribution = new Attribution({
  collapsible: false,
  collapsed: false,
});
let intervalID = 0;
let animateIndex = 1;

function main() {
  map = new Map({
    overlays: [overlay],
    controls: init_controls(),
    target: "map",
    view: view,
  });
  map.setLayers(ProductLayers.initLayers());
  ProductLayers.regLayerChanges(map);
  changeContinentSelectMode();
  registerMapHandlers();
  registerViewHandlers(map);
  initAnimationService(map);
}

function init_controls() {
  let control = defaultControls();
  control.pop();
  control.push(newAttribution);
  control.push(
    new FullScreen({
      source: document.getElementById("screen"),
    })
  );
  control.push(new Download());
  control.push(
    new MousePosition({
      coordinateFormat: createXYDirString(4),
      projection: currProj,
    })
  );
  return control;
}

function registerMapHandlers() {
  map.on("singleclick", function (evt) {
    let feature = map.forEachFeatureAtPixel(
      evt.pixel,
      function (feature, layer) {
        return feature;
      }
    );

    if (feature) {
      //update for dynamic showing - use feature.getKeys() to get names
      // dynamically show the stuf next time
      let information = `<p class="pop-info"><strong> Temperature</strong>: ${feature.get(
        "temperature"
      )}</p>
    <p class="pop-info"><strong>Geopotential Height</strong>: ${feature.get(
      "geopotential_height"
    )}</p>
    <p class="pop-info"><strong>Precipitation</strong>: ${feature.get(
      "precipitation"
    )}</p>`;
      content.innerHTML = information;
      overlay.setPosition(evt.coordinate);
    } else {
      overlay.setPosition(undefined);
    }
  });

  closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
  };
}

function changeContinentSelectMode() {
  document.querySelector(Constants.SELECTORS.CONTINENTS).regularSelectMode();
}

function registerViewHandlers() {
  document
    .querySelector(Constants.SELECTORS.CONTINENTS)
    .addEventListener("change", (event) => {
      let view = map.getView();
      let newCenter = Constants.CONTINENT_VIEWS[event.target.getValue()].center;
      let newZoom = Constants.CONTINENT_VIEWS[event.target.getValue()].zoom;
      view.setCenter(newCenter);
      view.setZoom(newZoom);
    });
}

window.onload = main;
