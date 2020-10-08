# phys-sim

A very simple gravity sim written in Typescript using a HTML Canvas as the visulizer.

## Selling features:

-   Use your mouse to spawn particles
-   Watch them fall
-   Advanced unused particle cleaning system(`if(y < 0){ DestroyParticle(); }`)

## How to set up:
-   Clone the repo
-   Run `yarn` or `npm i` (This will download the dependencies)
-   Run `yarn dev` or `npm run dev` to compile the typescript. (The compiled JS gets outputed into `public/js`)
-   Open `public/index.html` with a browser of your choice.