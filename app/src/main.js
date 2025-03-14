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
import OLCesium from "olcs";
import MapOverlay from "./Overlay.js";

const currProj = "ESPG:4326";
const extent = [-180, -125, 180, 125];
const view = new View({
  projection: "EPSG:4326",
  extent: extent,
  center: [0, 0],
  zoom: 2,
  maxZoom: 8,
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
    controls: init_controls(),
    target: "map",
    view: view,
  });
  map.setLayers(ProductLayers.initLayers());
  const ol3d = new OLCesium({ map: map, target: "map" });
  const overlay = new MapOverlay(map, ol3d, ol3d.getCesiumScene());
  ProductLayers.regLayerChanges(map);
  ProductLayers.regLayerChanges(map);
  changeContinentSelectMode();
  registerViewHandlers(map, ol3d);
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

function changeContinentSelectMode() {
  document.querySelector(Constants.SELECTORS.CONTINENTS).regularSelectMode();
}

function registerViewHandlers(map, ol3d) {
  document
    .querySelector(Constants.SELECTORS.CONTINENTS)
    .addEventListener("change", (event) => {
      let view = map.getView();
      let newCenter = Constants.CONTINENT_VIEWS[event.target.getValue()].center;
      let newZoom = Constants.CONTINENT_VIEWS[event.target.getValue()].zoom;
      view.setCenter(newCenter);
      view.setZoom(newZoom);
    });

  document
    .querySelector(Constants.SELECTORS.VIEW_3D)
    .addEventListener("change", (event) => {
      ol3d.setEnabled(event.target.checked);
    });
  const e = new Event("change");
  document.querySelector(Constants.SELECTORS.VIEW_3D).dispatchEvent(e);
}

window.onload = main;
