var canvas = document.getElementById("canvas");
canvas.width = 760;
canvas.height = 400;

var context = canvas.getContext("2d");
context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

var draw_color = "#262626";
var draw_width = "3";
var is_drawing = false;
var restore_array = [];
var index = -1;

function change_color(element) {
    draw_color = element.style.backgroundColor;
}

function reset_width() {
    draw_width = "3";
    document.getElementById("range").value = 3;
}

function clear_canvas() {
    context.fillStyle = "white";
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);
    restore_array = [];
}

function undo() {
    if (index <= 0) {
        clear_canvas();
    } else {
        index -= 1;
        restore_array.pop();
        context.putImageData(restore_array[index], 0, 0);
    }
}

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);

canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mouseup", stop, false);

function start(e) {
    is_drawing = true;
    context.beginPath();
    context.moveTo(
        e.clientX - canvas.offsetLeft - 20,
        e.clientY - canvas.offsetTop - 19
    );
    e.preventDefault();
}

function draw(e) {
    if (is_drawing) {
        context.lineTo(
            e.clientX - canvas.offsetLeft - 20,
            e.clientY - canvas.offsetTop - 19
        );
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
    }
    e.preventDefault();
}

function stop(e) {
    if (is_drawing) {
        context.stroke();
        context.closePath();
        is_drawing = false;
    }
    e.preventDefault();

    restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;
}

window.addEventListener("keyup", (e) => {
    if (e.ctrlKey && e.key === "z") {
        undo();
    }
});