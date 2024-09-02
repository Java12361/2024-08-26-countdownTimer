const display = document.getElementById("display");
let timer = null;
let startTime = 0;
let isRunning = false;
let countdownDuration = 0;
let remainingTime = 0;

function start() {
    if (!isRunning) {
        if (remainingTime === 0) {
            // First time starting or if the countdown is reset, calculate the countdown duration
            let hr = parseInt(document.getElementById('hr').textContent) || 0;
            let min = parseInt(document.getElementById('min').textContent) || 0;
            let sec = parseInt(document.getElementById('sec').textContent) || 0;
            countdownDuration = (hr * 60 * 60 * 1000) + (min * 60 * 1000) + (sec * 1000);
            remainingTime = countdownDuration;
        }
        startTime = Date.now();
        timer = setInterval(update, 100); // Update every 0.1 second
        isRunning = true;
    }
}

function stop() {
    if (isRunning) {
        clearInterval(timer);
        remainingTime -= Date.now() - startTime; // Adjust the remaining time
        isRunning = false;
    }
}

function reset() {
    location.reload();  // Reloads the current page
}



function update() {
    const currentTime = Date.now();
    let elapsedTime = currentTime - startTime;
    let timeLeft = remainingTime - elapsedTime;

    if (timeLeft <= 0) {
        clearInterval(timer);
        timeLeft = 0;
        isRunning = false;
    }

    let hours = Math.floor(timeLeft / (1000 * 60 * 60));
    let minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    let seconds = Math.floor((timeLeft / 1000) % 60);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    display.textContent = `${hours}:${minutes}:${seconds}`;
}

function validateInput(element, max) {
    let content = element.textContent;
    content = content.replace(/\D/g, '');

    if (content.length > 2) {
        content = content.slice(0, 2);
    }

    if (parseInt(content, 10) > max) {
        content = max.toString().padStart(2, '0');
    }

    element.textContent = content;

    let range = document.createRange();
    let sel = window.getSelection();
    range.setStart(element.childNodes[0], content.length);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('hr').addEventListener('input', function (e) {
        validateInput(e.target, 24);
    });

    document.getElementById('min').addEventListener('input', function (e) {
        validateInput(e.target, 60);
    });

    document.getElementById('sec').addEventListener('input', function (e) {
        validateInput(e.target, 60);
    });
});
