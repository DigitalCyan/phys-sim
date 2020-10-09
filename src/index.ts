// Setup
const canvas = <HTMLCanvasElement>document.getElementById('simcanvas');
const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');

import {SimObject, Vector2} from './interfaces';

const toggleTrajectory = <HTMLInputElement>(
    document.getElementById('toggleTrajectory')
);
const radiusNumber = <HTMLInputElement>document.getElementById('radiusNumber');

canvas.height = 500;
canvas.width = 500;

const gravity = -9.83;
const simObjects: Array<SimObject> = [];
const spaceScale = 0.025;
let radius = 300;

const dt = 0.001; // In seconds

let firstPos: Vector2;
radiusNumber.value = radius.toString();
const scaleP = <HTMLParagraphElement>document.getElementById("scaleP");
scaleP.innerHTML = `Space scale: ${spaceScale}[px/m]`;

// Rendering
const renderSimObject = (simObject: SimObject) => {
    ctx.beginPath();
    ctx.arc(
        simObject.position.x,
        canvas.height - simObject.position.y,
        simObject.rad * spaceScale,
        0,
        360
    );
    ctx.stroke();
};

const renderSimObjects = (simObjects: Array<SimObject>) => {
    simObjects.forEach((simObject) => {
        renderSimObject(simObject);
    });
};

const renderSimObjectTrajectory = (simObject: SimObject) => {
    ctx.beginPath();
    ctx.moveTo(simObject.position.x, canvas.height - simObject.position.y);
    ctx.lineTo(
        simObject.position.x + simObject.vel.x,
        canvas.height - simObject.position.y - simObject.vel.y
    );
    ctx.stroke();
};

const renderSimobjectsTrajectories = (simObject: Array<SimObject>) => {
    simObjects.forEach((simObject) => {
        renderSimObjectTrajectory(simObject);
    });
};

// Physics
const processSimObject = (simObject: SimObject) => {
    simObject.position.x += simObject.vel.x * spaceScale;
    simObject.position.y += simObject.vel.y * spaceScale;
    simObject.vel.y += (gravity * dt) / spaceScale;
};

const processSimObjects = (simObjects: Array<SimObject>) => {
    simObjects.forEach((simObject, index) => {
        if (simObject.position.y < 0) {
            simObjects.splice(index, 1);
        } else {
            processSimObject(simObject);
        }
    });
};

// Settings
radiusNumber.addEventListener('change', (e: Event) => {
    radius = parseInt(radiusNumber.value);
});

// Main
canvas.addEventListener('mousedown', (e: MouseEvent) => {
    firstPos = {
        x: e.offsetX,
        y: canvas.height - e.offsetY,
    };
});

canvas.addEventListener('mouseup', (e: MouseEvent) => {
    let secondPos: Vector2 = {
        x: e.offsetX,
        y: canvas.height - e.offsetY,
    };
    simObjects.push({
        position: {
            x: firstPos.x,
            y: firstPos.y,
        },
        vel: {
            x: (secondPos.x - firstPos.x),
            y: (secondPos.y - firstPos.y),
        },
        rad: radius,
    });
});

const mainloop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    processSimObjects(simObjects);
    renderSimObjects(simObjects);
    if (toggleTrajectory.checked) {
        renderSimobjectsTrajectories(simObjects);
    }
};

setInterval(mainloop, dt * 1000);
