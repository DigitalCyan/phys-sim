// Setup

const canvas = <HTMLCanvasElement>document.getElementById('simcanvas');
const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

const gravity = -9.83;
const simObjects: Array<SimObject> = [];
const spaceScale = 0.075;

const dt = 0.001; // In seconds

let firstPos: Vector2;

// Interfaces

interface Vector2 {
    x: number;
    y: number;
}

interface SimObject {
    position: Vector2;
    vel: Vector2;
    rad: number;
}

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
            x: e.offsetX,
            y: canvas.height - e.offsetY,
        },
        vel: {
            x: (secondPos.x - firstPos.x) * spaceScale * 5,
            y: (secondPos.y - firstPos.y) * spaceScale * 5,
        },
        rad: 30,
    });
});

const mainloop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    processSimObjects(simObjects);
    renderSimObjects(simObjects);
};

setInterval(mainloop, dt * 1000);
