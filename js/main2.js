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


let image = null;

const settings = {};

// const init = () => {
//   settings.brightness.value = "100";
//   settings.saturation.value = "100";
//   settings.blure.value 
// }