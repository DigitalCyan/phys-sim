"use strict";
// Setup
var canvas = document.getElementById('simcanvas');
var ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;
var gravity = -9.83;
var simObjects = [];
var spaceScale = 0.075;
var dt = 0.001; // In seconds
var firstPos;
// Rendering
var renderSimObject = function (simObject) {
    ctx.beginPath();
    ctx.arc(simObject.position.x, canvas.height - simObject.position.y, simObject.rad * spaceScale, 0, 360);
    ctx.stroke();
};
var renderSimObjects = function (simObjects) {
    simObjects.forEach(function (simObject) {
        renderSimObject(simObject);
    });
};
// Physics
var processSimObject = function (simObject) {
    simObject.position.x += simObject.vel.x * spaceScale;
    simObject.position.y += simObject.vel.y * spaceScale;
    simObject.vel.y += (gravity * dt) / spaceScale;
};
var processSimObjects = function (simObjects) {
    simObjects.forEach(function (simObject, index) {
        if (simObject.position.y < 0) {
            simObjects.splice(index, 1);
        }
        else {
            processSimObject(simObject);
        }
    });
};
// Main
canvas.addEventListener('mousedown', function (e) {
    firstPos = {
        x: e.offsetX,
        y: canvas.height - e.offsetY,
    };
});
canvas.addEventListener('mouseup', function (e) {
    var secondPos = {
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
var mainloop = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    processSimObjects(simObjects);
    renderSimObjects(simObjects);
};
setInterval(mainloop, dt * 1000);
