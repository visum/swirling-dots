# swirling-dots
A pretty number visualizer inspired by this [Numberphile video](https://www.youtube.com/watch?v=sj8Sg8qnjOg).

See it in action here: [https://visum.github.io/swirling-dots/](https://visum.github.io/swirling-dots/)

## How it works
The app draws a few hundred dots radiating from the center of the page. Each time a new dot is drawn, it is rotated around the center by the amount in the "Turns per dot" field.

For example, if you enter `0.25` in that field, each dot will be a quarter of a turn from the last dot, and you'll see four spokes radiating from the center.

Instead of entering decimal values, you can also enter a fraction in the Fraction fields (numerator and denominator), click the "Use" button, and see the result.

The Zoom slider adjusts the space from one dot to the next along the radius.

## Why it's cool
For any fraction, the number of spokes you see will be the denominator of the reduced fraction. Try drawing `0.3`, then `0.33`, then `0.333`, and so on, to see how the image changes from 10 spokes (`3/10`) to three swirls, and approaches equal thirds as more precision is added.

Irrational numbers (numbers which can't be expressed as a fraction) have no spkes, but seem to swirl around. Some presets of famous irrational numbers are provided. The Numberphile video goes in depth on the subject, and is definetly worth a watch.

## Animating
On the right side are the animation controls. For each tick, the value of the "Turns per dot" will change by the amount given in the "Animation speed" field. Negative numbers are allowed. The "Tails" feature is just gratuitous prettiness.

It's fun to start the animation and watch the swirls come and go, and spokes form and twirl away. Whenever there are spokes going straight out, you know the value of the "Turns per dot" field is close to a rational number.
