const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const dots = 500;
const radiusMultiplier = 1.3;

let animating = false;

// Not used now, but can be used to approach the golden ratio:
// let ratio = ratioStep(ratioStep(ratioStep(ratioStep(1))));
const ratioStep = x => 1 + 1 / x;

// Gather input references
const inputs = {};
[
  "offset",
  "draw",
  "rate",
  "start",
  "stop",
  "clear",
  "tails",
  "radiusMultiplier",
  "multiplerOutput",
  "rootTwo",
  "pi",
  "golden",
  "numerator",
  "denominator",
  "calcFraction"
].forEach(key => {
  inputs[key] = document.querySelector("#" + key);
});


/**
 * Things that do things
 */

const init = function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  update();
  requestAnimationFrame(tick);
}

const update = function() {
  const arcMultiplier = parseFloat(inputs.offset.value);
  const radiusMultiplier = parseFloat(inputs.radiusMultiplier.value);
  draw(arcMultiplier, radiusMultiplier);
};

const draw = function(arcMultiplier, radiusMultiplier) {
  if (inputs.tails.checked) {
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
  } else {
    clear();
  }

  for (var i = 0; i < dots; i++) {
    const blue = 255 * (i / dots);
    ctx.fillStyle = `rgb(0,0,${blue})`;
    const radius = i * radiusMultiplier;
    const arc = i * arcMultiplier * 2 * Math.PI;
    const x = Math.sin(arc) * radius + canvas.width / 2;
    const y = Math.cos(arc) * radius + canvas.height / 2;
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }
};

const clear = function() {
  ctx.fillStyle = "white";
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fill();
};

const tick = function() {
  if (animating) {
    const rate = parseFloat(inputs.rate.value);
    const newOffset =
      Math.floor((parseFloat(inputs.offset.value) + rate) * 10000000) /
      10000000;
    inputs.offset.value = newOffset;
    update();
  }
  requestAnimationFrame(tick);
};

/**
 * Event listeners
 */

inputs.draw.addEventListener("click", () => {
  update();
});

inputs.start.addEventListener("click", () => {
  animating = true;
  inputs.start.disabled = true;
  inputs.stop.disabled = false;
});

inputs.stop.addEventListener("click", () => {
  animating = false;
  inputs.stop.disabled = true;
  inputs.start.disabled = false;
});

inputs.clear.addEventListener("click", () => {
  clear();
});

inputs.rootTwo.addEventListener("click", () => {
  inputs.offset.value = Math.SQRT2;
});

inputs.pi.addEventListener("click", () => {
  inputs.offset.value = 1 / Math.PI;
});

inputs.golden.addEventListener("click", () => {
  inputs.offset.value = 1.61803398875;
});

inputs.calcFraction.addEventListener("click", () => {
  inputs.offset.value =
    parseFloat(inputs.numerator.value) / parseFloat(inputs.denominator.value);
    update();
});

inputs.radiusMultiplier.addEventListener("input", event => {
  inputs.multiplerOutput.textContent = event.target.value;
  update();
});

window.addEventListener("resize", event => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  update();
});

/**
 * Get this party started!
 */
init();
