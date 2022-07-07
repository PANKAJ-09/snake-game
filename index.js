//game variable

let inputDir = { x: 0, y: 0 };
const foodsound = new Audio("food.mp3");
const gameoversound = new Audio("gameover.mp3")
const movesound = new Audio("move.mp3");
const music = new Audio("music.mp3");
let speed = 3;
let score = 0;
let snakearr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 }
let lastPaintTime = 0;


//game functions

//can also use setinterval
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    } else
        lastPaintTime = ctime;
    gameengine();
}


function isCollide(snake) {

    //if you bump into yourself
    for (let i = 1; i < snakearr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    //if you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0)
        return true;



}

function gameengine() {
    //part 1:updating the snake array and food
    if (isCollide(snakearr)) {

        gameoversound.play();
        music.pause();
        inputDir = { x: 0, y: 0 };
        speed = 3;
        alert("Game Over Press any key to play again");
        snakearr = [{ x: 13, y: 15 }]
        music.play();
        score = 0;

    }


    //if you have eaten the food increment the score and regenegrate the food
    if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
        foodsound.play();
        score += 1;
        speed += 1;

        scorebox.innerHTML = "Score:" + score;
        snakearr.unshift({ x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y });
        food = { x: Math.round(2 + (16 - 2) * Math.random()), y: Math.round(2 + (16 - 2) * Math.random()) }
    }


    //moving the snake
    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = {...snakearr[i] };

    }
    snakearr[0].x += inputDir.x;
    snakearr[0].y += inputDir.y;


    //part 2:display the snake and food

    //dispay the snake
    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeelement = document.createElement('div');
        snakeelement.style.gridRowStart = e.y;
        snakeelement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeelement.classList.add('head');
        } else {
            snakeelement.classList.add('snake');
        }
        board.appendChild(snakeelement);
    })

    //display the food
    foodelement = document.createElement('div');
    foodelement.style.gridRowStart = food.y;
    foodelement.style.gridColumnStart = food.x;
    foodelement.classList.add('food');
    board.appendChild(foodelement);

}















//main logic starts here





//high score calculation

// let hiscore = localStorage.getItem("hiscore");
// if (hiscore === null) {
//     let hiscoreval = 0;
//     localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
// } else {
//     hiscoreval = JSON.parse(hiscore);
//     hiscoreboxxxx.innerHTML = "hiscore:" + hiscore;
// }







window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } //start the game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }
})
