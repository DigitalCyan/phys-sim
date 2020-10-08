"use strict";
// Setup
var canvas = document.getElementById('simcanvas');
var ctx = canvas.getContext('2d');
var toggleTrajectory = (document.getElementById('toggleTrajectory'));
var radiusNumber = document.getElementById('radiusNumber');
canvas.height = 500;
canvas.width = 500;
var gravity = -9.83;
var simObjects = [];
var spaceScale = 0.025;
var radius = 300;
var dt = 0.001; // In seconds
var firstPos;
radiusNumber.value = radius.toString();
var scaleP = document.getElementById("scaleP");
scaleP.innerHTML = "Space scale: " + spaceScale + "[px/m]";
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
var renderSimObjectTrajectory = function (simObject) {
    ctx.beginPath();
    ctx.moveTo(simObject.position.x, canvas.height - simObject.position.y);
    ctx.lineTo(simObject.position.x + simObject.vel.x, canvas.height - simObject.position.y - simObject.vel.y);
    ctx.stroke();
};
var renderSimobjectsTrajectories = function (simObject) {
    simObjects.forEach(function (simObject) {
        renderSimObjectTrajectory(simObject);
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
// Settings
radiusNumber.addEventListener('change', function (e) {
    radius = parseInt(radiusNumber.value);
});
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
var mainloop = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    processSimObjects(simObjects);
    renderSimObjects(simObjects);
    if (toggleTrajectory.checked) {
        renderSimobjectsTrajectories(simObjects);
    }
};
setInterval(mainloop, dt * 1000);
