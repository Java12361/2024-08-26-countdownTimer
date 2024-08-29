const display = document.getElementById("display");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
const countdownDuration = 5 * 60 * 1000;

function start(){
    if(!isRunning){
        startTime = Date.now() - elapsedTime; //now-(now-startTime) like 13:19-(13:19-13:18) = 00:01
        remainingTime = countdownDuration;
        timer = setInterval(update, 10); //update timer every 10 milli sec
        isRunning = true;
    }
}

function stop(){
    /*
        clearInter
    */
    if(isRunning){
        clearInterval(timer); //stop the repeated execution of the update function.
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
}

function update(){ //update function get call every 10 milli second by 'setInterval' function
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