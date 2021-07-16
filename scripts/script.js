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


const gameStart = (name1, name2) => {
    const player1 = personFactory(`${name1}`, "x");
    const player2 = personFactory(`${name2}`, "o")
    return { player1, player2 }
}

//adds marker to gameBoard
const addMark = (
    function() {
        let x = 1;
        let currentPlayer;
        const fun = (event) => {
            let players = gameStart(game.playerName1, game.playerName2)
            let index = parseInt(event.target.classList.value) - 1;
            if (gameBoard.gameBoardArr[index] === null) {
                if (x % 2 == 0) {
                    currentPlayer = players.player1;
                } else {
                    currentPlayer = players.player2;
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

//checks if game is over
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
                gameButtons.forEach(button => {
                    button.removeEventListener('click', addMark.fun);
                })
            } else if ((arr[0] == arr[1]) && (arr[1] == arr[2]) && (arr[2] == gameStart().player2.marker) ||
                (arr[3] == arr[4]) && (arr[4] == arr[5]) && (arr[5] == gameStart().player2.marker) ||
                (arr[6] == arr[7]) && (arr[7] == arr[8]) && (arr[8] == gameStart().player2.marker) ||
                (arr[0] == arr[3]) && (arr[3] == arr[6]) && (arr[6] == gameStart().player2.marker) ||
                (arr[1] == arr[4]) && (arr[4] == arr[7]) && (arr[7] == gameStart().player2.marker) ||
                (arr[2] == arr[5]) && (arr[5] == arr[8]) && (arr[8] == gameStart().player2.marker) ||
                (arr[0] == arr[4]) && (arr[4] == arr[8]) && (arr[8] == gameStart().player2.marker) ||
                (arr[2] == arr[4]) && (arr[4] == arr[6]) && (arr[6] == gameStart().player2.marker)) {
                gameButtons.forEach(button => {
                    button.removeEventListener('click', addMark.fun)
                })
            } else if (!gameBoard.gameBoardArr.some(item => item === null)) {
                gameButtons.forEach(button => {
                    button.addEventListener('click', addMark.fun)
                })
            }
        }
        return { check }
    }
)()

const game = (
    function() {
        const realGameBoard = document.querySelector('table')
        let playerName1;
        let playerName2;
        const start = (event) => {
            const input1 = document.querySelector('#input1');
            const input2 = document.querySelector('#input2');
            playerName1 = input1.value;
            playerName2 = input2.value;
            input1.parentNode.remove();
            event.target.parentNode.remove();
            realGameBoard.classList.add('visible')
            const gameButtons = document.querySelectorAll('th');
            gameButtons.forEach(button => {
                button.addEventListener('click', addMark.fun)
            })
        }
        return { start, playerName1, playerName2 }
    }
)()

const choseNames = (
    function() {
        const div = document.querySelector('div#gameboard');
        const start = document.createElement('button');
        const span = document.createElement('span');
        const inputs = document.createElement('div');
        const input1 = document.createElement('input');
        const input2 = document.createElement('input');
        const center = document.createElement('div');
        center.setAttribute('id', "center");
        input1.setAttribute('type', 'text');
        input2.setAttribute('type', 'text');
        input1.setAttribute('placeholder', "Enter Player 1 name");
        input2.setAttribute('placeholder', "Enter Player 2 name");
        input1.setAttribute('id', "input1");
        input2.setAttribute('id', "input2");
        inputs.appendChild(input1);
        inputs.appendChild(input2);
        start.classList.add('button');
        span.textContent = "Start";
        start.appendChild(span);
        inputs.setAttribute('id', "inputcontrol")
        center.appendChild(start);
        const playerSelection = (event) => {
            event.target.parentNode.remove()
            div.appendChild(inputs)
            div.appendChild(center);
            start.addEventListener('click', game.start)
        }
        return { playerSelection }
    }
)()

const chooseMode = (
    function() {
        const div = document.querySelector('div#gameboard');
        const players = document.createElement('button');
        players.setAttribute('id', "players");
        players.textContent = "Player vs Player"
        const ai = document.createElement('button');
        ai.textContent = "Player vs Computer"
        ai.setAttribute('id', "ai");
        const mode = document.createElement('div');
        mode.setAttribute('id', "mode");
        mode.appendChild(players);
        mode.appendChild(ai);
        div.appendChild(mode);
        players.addEventListener('click', choseNames.playerSelection)
    }
)()