// creates gameboardarray
const gameBoard = (
    function() {
        let gameBoardArr = [];
        let x = 1;
        while (x < 10) {
            gameBoardArr.push(null);
            x++
        }
        return {
            gameBoardArr
        }
    }
)();

//creates person
const personFactory = (player, mark) => {
    return { name: player, marker: mark }
}


//cycles throuch gameboard array and changes corresponding table cell
const displayControl = (
    function() {
        let x = 0;
        const ths = document.querySelectorAll('th');
        const update = () => {
            ths.forEach(th => {
                if (gameBoard.gameBoardArr[x] === "x") {
                    th.style.color = "blue"
                    th.textContent = gameBoard.gameBoardArr[x];
                } else {
                    th.style.color = "red"
                    th.textContent = gameBoard.gameBoardArr[x];
                }
                x++
            })
            x = 0;
        }
        return {
            update
        }
    }
)()

const gameStart = () => {
    const player1 = personFactory('player1', "x");
    const player2 = personFactory('player2', "o")
    return { player1, player2 }
}

const addMark = (
    function() {
        let x = 1;
        let currentPlayer;
        const fun = (event) => {
            gameStart()
            let index = parseInt(event.target.classList.value) - 1;
            if (gameBoard.gameBoardArr[index] === null) {
                if (x % 2 == 0) {
                    currentPlayer = gameStart().player1;
                } else {
                    currentPlayer = gameStart().player2;
                }
                gameBoard.gameBoardArr[index] = currentPlayer.marker;
                x++
            }
            displayControl.update()
            gameOver.check()
        }
        return { fun }
    }
)()

const buttons = document.querySelectorAll('th');
buttons.forEach(button => {
    button.addEventListener('click', addMark.fun)
})

const gameOver = (
    function() {
        const check = () => {
            let arr = [...gameBoard.gameBoardArr];
            if ((arr[0] == arr[1]) && (arr[1] == arr[2]) && (arr[2] == gameStart().player1.marker) ||
                (arr[3] == arr[4]) && (arr[4] == arr[5]) && (arr[5] == gameStart().player1.marker) ||
                (arr[6] == arr[7]) && (arr[7] == arr[8]) && (arr[8] == gameStart().player1.marker) ||
                (arr[0] == arr[3]) && (arr[3] == arr[6]) && (arr[6] == gameStart().player1.marker) ||
                (arr[1] == arr[4]) && (arr[4] == arr[7]) && (arr[7] == gameStart().player1.marker) ||
                (arr[2] == arr[5]) && (arr[5] == arr[8]) && (arr[8] == gameStart().player1.marker) ||
                (arr[0] == arr[4]) && (arr[4] == arr[8]) && (arr[8] == gameStart().player1.marker) ||
                (arr[2] == arr[4]) && (arr[4] == arr[6]) && (arr[6] == gameStart().player1.marker)) {
                console.log("player 1 wins")
            } else if ((arr[0] == arr[1]) && (arr[1] == arr[2]) && (arr[2] == gameStart().player2.marker) ||
                (arr[3] == arr[4]) && (arr[4] == arr[5]) && (arr[5] == gameStart().player2.marker) ||
                (arr[6] == arr[7]) && (arr[7] == arr[8]) && (arr[8] == gameStart().player2.marker) ||
                (arr[0] == arr[3]) && (arr[3] == arr[6]) && (arr[6] == gameStart().player2.marker) ||
                (arr[1] == arr[4]) && (arr[4] == arr[7]) && (arr[7] == gameStart().player2.marker) ||
                (arr[2] == arr[5]) && (arr[5] == arr[8]) && (arr[8] == gameStart().player2.marker) ||
                (arr[0] == arr[4]) && (arr[4] == arr[8]) && (arr[8] == gameStart().player2.marker) ||
                (arr[2] == arr[4]) && (arr[4] == arr[6]) && (arr[6] == gameStart().player2.marker)) {
                console.log("player 2 wins")
            } else if (!gameBoard.gameBoardArr.some(item => item === null)) {
                console.log("draw")
            }
        }
        return { check }
    }
)()