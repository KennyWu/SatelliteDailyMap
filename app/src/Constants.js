export const IMAGE_TEMPLATE_URL =
  "https://www.star.nesdis.noaa.gov/smcd/emb/land/__products/test/daily/{yyyy}/{mm}/{dd}/{datatype}_{satellite}_{variable}_{yyyymmdd}_{day[night]}.{fileformat}";

export const LEGEND_TEMPLATE_URL =
  "./legend/legend_{variable}_{day[night]}.png";
export const PRODUCT_LAYERS_ID_MAPPING = { "#pl-1": 1, "#pl-2": 2, "#pl-3": 3 };
export const ANIMATE_PRODUCT_LAYER_ENABLE = [
  "#animatepl-1",
  "#animatepl-2",
  "#animatepl-3",
];
export const SELECTORS = {
  DAY_NIGHT: ".day-night-selector",
  OPACITY: ".opacity",
  PRODUCT_LAYER_TYPE: ".product-layer-type",
  PRODUCT_LAYER: ".product-layer",
  VISIBLE: ".visible",
  DATE: "#date",
  SATELLITE: ".satellite",
  CONTINENTS: "#continents",
  PRODUCT_LAYER_ONE: "#pl-1",
  PRODUCT_LAYER_TWO: "#pl-2",
  PRODUCT_LAYER_THREE: "#pl-3",
  ENABLE_ANIMATE: "#animate",
  ANIMATE_SPEED: "#animate-speed",
  ANIMATE_FROM: "#from-date",
  ANIMATE_TO: "#to-date",
  ANIMATION_LAYER: "#animation-layer",
  ANIMATION_DATE_RANGE: "#animation-date-range",
  ANIMATION_CONFIGURE: "#animation-configure",
  ANIMATION_PRODUCT_LAYER: "#animation-product-layer",
  VIEW_3D: "#view-3d",
};

export const SATELLITE = {
  JPSS: "jpss",
  MODIS: "modis",
  GPM: "gpm",
};

export const ANOMALYMAPPING = {
  LSTA: fillConstants(
    "lsta",
    "LST Anomaly",
    [SATELLITE.JPSS, SATELLITE.MODIS],
    true
  ),
  LST: fillConstants("lst", "LST", [SATELLITE.JPSS, SATELLITE.MODIS], true),
  LST_BORDERS: fillConstants("lsta", "LST Borders", [SATELLITE.JPSS], true),
};

export const DATATYPE = {
  BORDERS: "detectionborders",
  IMAGE: "dataimage",
};
export const FILEFORMAT = {
  JSON: "json",
  PNG: "png",
};
export const DAYNIGHT = {
  DAY: "day",
  NIGHT: "night",
  NONE: "none",
};
export const MONTHMAP = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  June: "06",
  July: "07",
  Aug: "08",
  Sept: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export const CONTINENTS = [
  "Global",
  "Africa",
  "Asia",
  "Europe",
  "N_America",
  "Oceania",
  "S_America",
];

export const CONTINENT_VIEWS = {
  Global: {
    center: [0, 0],
    zoom: 2,
  },
  N_America: {
    center: [-94.17006657178112, 44.140217956349986],
    zoom: 3.3584629689815606,
  },
  S_America: {
    center: [-57.33868773101648, -21.095320348067848],
    zoom: 3.856796302314895,
  },
  Africa: {
    center: [28.70623446400729, 0.20404521197346392],
    zoom: 3.7534629689815597,
  },
  // AN: {
  //   center: [3.614104403963678, -8.920360151165461],
  //   zoom: 2.4084629689815586,
  // },
  Europe: {
    center: [12.625158068975857, 53.316551892077825],
    zoom: 4.473462968981556,
  },
  Asia: {
    center: [91.2482594184713, 50.1690698507913],
    zoom: 3.490129635648221,
  },
  Oceania: {
    center: [115.85804397460218, -12.292736955229955],
    zoom: 3.7067963023148898,
  },
};

export const NON_PROPERTIES = new Set(["geometry", "border_color"]);

export const DEFAULT_OPTION_PRODUCT = [
  {
    id: SELECTORS.PRODUCT_LAYER_ONE,
    layer: ANOMALYMAPPING.LSTA.name,
    show: true,
  },
  {
    id: SELECTORS.PRODUCT_LAYER_TWO,
    layer: ANOMALYMAPPING.LST_BORDERS.name,
    show: true,
  },
  {
    id: SELECTORS.PRODUCT_LAYER_THREE,
    layer: ANOMALYMAPPING.LSTA.name,
    show: false,
  },
];

function fillConstants(variable, name, satellites, hasDayNight) {
  return {
    variable: variable,
    name: name,
    satellites: satellites,
    hasDayNight: hasDayNight,
  };
}

export const MIN_YEAR_LOOKBACK = 2014;
export const VALID_YEARS_RANGE = [
  2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026,
  2027, 2028, 2029, 2030,
];
export const VALID_DAY_RANGE = Array.from({ length: 31 }, (v, k) => k + 1);
export const FORWARD = "forward-change";
export const BACKWARD = "backward-change";

Object.freeze(CONTINENT_VIEWS);
Object.freeze(SELECTORS);
Object.freeze(ANOMALYMAPPING);
Object.freeze(SATELLITE);
Object.freeze(PRODUCT_LAYERS_ID_MAPPING);
Object.freeze(DATATYPE);
Object.freeze(FILEFORMAT);
Object.freeze(MONTHMAP);
