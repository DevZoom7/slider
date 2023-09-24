const slider = document.querySelector(".slider");
const circle = slider.querySelector(".circle");

slider.addEventListener("pointerdown", handlePointerDown);

/**
 *
 * @param {PointerEvent} e
 */

function handlePointerDown(e) {
   slider.setPointerCapture(e.pointerId);
   updateCirclePosition(e);
   slider.addEventListener("pointermove", updateCirclePosition);
   slider.addEventListener("pointerup", () => {
      slider.removeEventListener("pointermove", updateCirclePosition);
   });
}

/**
 *
 * @param {PointerEvent} e
 */

function updateCirclePosition(e) {
   const { clientX } = e;
   const { x: sliderX, width: sliderWidth } = slider.getBoundingClientRect();
   const x = clientX - sliderX;
   const steps = 100;
   const currentStep = Math.trunc((x / sliderWidth) * steps);
   const leftPercentage = (currentStep / steps) * 100;
   circle.style.setProperty("--left", percentify(minmax(0, leftPercentage, 100)));
   circle.setAttribute("data-step", minmax(0, currentStep, steps).toString());
}

/**
 *
 * @param {string | number} value
 * @returns {string}
 */

function percentify(value) {
   return `${value}%`;
}

/**
 *
 * @param {number} min
 * @param {number} value
 * @param {number} max
 * @returns {number}
 */

function minmax(min, value, max) {
   return Math.max(min, Math.min(value, max));
}
