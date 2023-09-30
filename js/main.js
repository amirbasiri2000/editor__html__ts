const canvas = document.querySelector("#canvas");
const brightness = document.querySelector(".brightness");
const saturation = document.querySelector(".saturation");
const blure = document.querySelector(".blure");
const inversion = document.querySelector(".inversion");
const file = document.querySelector(".file");
const reset = document.querySelector("#reset");
const color = document.querySelector(".colorPicker");
const bgCanvas = document.querySelector(".bg__colorPicker");
const penWidth = document.querySelector(".pen__size");
const zoomImg = document.querySelector(".zoom__img");
const unzoomImg = document.querySelector(".unzoom__img");

const ctx = canvas.getContext("2d");

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth / 1.3 - canvasOffsetX;
canvas.height = window.innerHeight / 1.5 - canvasOffsetY;

let settings = {};
let image = "";
let startX;
let startY;
let isPainting = false;

const init = () => {
  settings.brightness = "100";
  settings.saturation = "100";
  settings.blure = "0";
  settings.inversion = "0";
  settings.color = "#000";
  settings.canvasBG = "#fff";
  settings.pen = "4";
  settings.zoom = 1;

  brightness.value = "100";
  saturation.value = "100";
  blure.value = "0";
  inversion.value = "0";
  ctx.fillStyle = "red";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// ________________addEventListener;

reset.addEventListener("click", () => {
  init();
  updateSettings();
});

addEventListener("load", () => {
  init();
  updateSettings();
  // if (!image) return;
});

const updateSettings = (key, value) => {
  settings[key] = value;
  if (!image) return;
  renderImage();
  generateFilters();
};

brightness.addEventListener("input", () => {
  updateSettings("brightness", brightness.value);
});

saturation.addEventListener("input", () => {
  updateSettings("saturation", saturation.value);
});

blure.addEventListener("input", () => {
  updateSettings("blure", blure.value);
});

inversion.addEventListener("input", () => {
  updateSettings("inversion", inversion.value);
});

file.addEventListener("change", () => {
  image = new Image();
  image.src = URL.createObjectURL(file.files[0]);
  image.addEventListener("load", () => {
    init();
    renderImage();
  });
});

canvas.addEventListener("mousedown", (e) => {
  isPainting = true;
  startX = e.clientX;
  startY = e.clientY;
});

canvas.addEventListener("mouseup", (e) => {
  isPainting = false;
  ctx.stroke();
  ctx.beginPath();
});

canvas.addEventListener("mousemove", (e) => {
  if (!isPainting) return;

  ctx.lineWidth = settings.pen;
  ctx.strokeStyle = settings.color;
  ctx.lineCap = "round";

  ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
  ctx.stroke();
});

color.addEventListener("change", (e) => {
  updateSettings("color", e.target.value);
});

bgCanvas.addEventListener("change", (e) => {
  updateSettings("canvasBG", e.target.value);
});

penWidth.addEventListener("change", (e) => {
  updateSettings("pen", penWidth.value);
});

zoomImg.addEventListener('click', () => {
  updateSettings('zoom', settings.zoom += 1)
 
})

// ____________functions

const generateFilters = () => {
  let { brightness, saturation, blure, inversion } = settings;

  return `brightness(${brightness}%) saturate(${saturation}%) blur(${blure}px) invert(${inversion}%) `;
};

const renderImage = () => {
  canvas.width = image.width;
  canvas.height = image.height;

  ctx.filter = generateFilters();
  ctx.scale(settings.zoom, settings.zoom);
  ctx.drawImage(image, 0, 0);
};
