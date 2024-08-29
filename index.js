const display = document.getElementById("display");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
const countdownDuration = 5 * 60 * 1000;

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