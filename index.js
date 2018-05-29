const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const ratioStep = x => 1 + 1 / x;

let animating = false;

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

const dots = 500;
const radiusMultiplier = 1.3;

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
    ctx.fillStyle = `rgba(0,0,${blue})`;
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

inputs.draw.addEventListener("click", () => {
  const radiusMultiplier = parseFloat(inputs.radiusMultiplier.value);
  const arcMultiplier = parseFloat(inputs.offset.value);
  draw(arcMultiplier, radiusMultiplier);
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
});

window.addEventListener("resize", event => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  inputs.draw.dispatchEvent(new Event("click"));
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

inputs.draw.dispatchEvent(new Event("click"));

const tick = () => {
  const radiusMultiplier = parseFloat(inputs.radiusMultiplier.value);
  inputs.multiplerOutput.textContent = radiusMultiplier;
  if (animating) {
    const rate = parseFloat(inputs.rate.value);
    const newOffset =
      Math.floor((parseFloat(inputs.offset.value) + rate) * 10000000) /
      10000000;
    inputs.offset.value = newOffset;
    draw(newOffset, radiusMultiplier);
  }
  requestAnimationFrame(tick);
};

requestAnimationFrame(tick);
