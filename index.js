const display = document.getElementById("display");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let hr = document.getElementById('hr').textContent;
let min = document.getElementById('min').textContent;
let sec = document.getElementById('sec').textContent;
const countdownDuration = (hr * 60 * 60 * 1000)+(min * 60 * 1000)+(sec * 1000);

function start(){
    /*
        1.if true will run the block
        2.set startTime = now-(now-startTime) e.g.13:19-(13:19-13:18) = 00:01
        3.update timer every 10 milli sec by serInterval function
    */
    if(!isRunning){
        startTime = Date.now() - elapsedTime;
        remainingTime = countdownDuration;
        timer = setInterval(update, 10);
        isRunning = true;
    }
}

function stop(){
    /*
        1.if false will run the block
        2.stop the repeated execution of the update function by clearInterval function
        3.update latest elapsedTime
    */
    if(isRunning){
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
}

//function call every 10 milli second by 'setInterval' function on start function
function update(){
    /*
        1.update elapsedTime
        2.remainingTime is userTimeInput - elapsedTime
        3.if condition to stop the timer if it's <=0(cannot be negative number)
        4.convert milliSec to each time then disply
    */
    const currentTime = Date.now();
    elapsedTime =  currentTime - startTime;
    remainingTime = countdownDuration - elapsedTime;

    if (remainingTime <= 0) {
        clearInterval(timer);
        remainingTime = 0;
        isRunning = false;
    }

    let hours = Math.floor(remainingTime / (1000 * 60 * 60));
    let minutes = Math.floor(remainingTime / (1000 * 60) %60);
    let seconds = Math.floor(remainingTime / 1000 % 60);
    //let milliseconds = Math.floor(remainingTime % 1000 /10);

    hours = String(hours).padStart(2,"0");
    minutes = String(minutes).padStart(2,"0");
    seconds = String(seconds).padStart(2,"0");
    //milliseconds = String(milliseconds).padStart(2,"0");

    display.textContent = `${hours}:${minutes}:${seconds}`;
    //display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function validateInput(element, max) {
    let content = element.textContent;

    // Remove non-numeric characters
    content = content.replace(/\D/g, '');

    // Limit to two digits
    if (content.length > 2) {
        content = content.slice(0, 2);
    }

    // Limit the number to the maximum allowed value
    if (parseInt(content, 10) > max) {
        content = max.toString().padStart(2, '0');
    }

    // Update the contenteditable element with the valid content
    element.textContent = content;

    // Set the cursor position to the end
    let range = document.createRange();
    let sel = window.getSelection();
    range.setStart(element.childNodes[0], content.length);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
}

// Apply the validation to the hr, min, and sec elements
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
