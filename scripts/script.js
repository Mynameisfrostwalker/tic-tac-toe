// creates gameboardarray
const gameBoard = (
    function() {
        let gameBoardArr = [];
        let x = 1;
        while (x < 10) {
            gameBoardArr.push(null);
            x++
        }
        const wipe = () => {
            let y = 0;
            while (y < 9) {
                gameBoardArr[y] = null;
                y++
            }
        }
        return {
            gameBoardArr,
            wipe,
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
                    player1.classList.toggle('background');
                    player2.classList.toggle('background');
                } else {
                    th.style.color = "red"
                    th.textContent = gameBoard.gameBoardArr[x];
                    player2.classList.toggle('background');
                    player1.classList.toggle('background');
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


const playersMaker = (name1, name2) => {
    const player1 = personFactory(`${name1}`, "x");
    const player2 = personFactory(`${name2}`, "o")
    return { player1, player2 }
}

//adds marker to gameBoard
const addMark = (
    function() {
        let turn = [null, null];
        let currentPlayer;
        const fun = (event) => {
            let index = parseInt(event.target.classList.value) - 1;
            if (gameBoard.gameBoardArr[index] === null) {
                if (turn.length % 2 == 0) {
                    currentPlayer = game.gamePlayers[0].player1;
                } else if (turn.length % 2 !== 0 && game.gamePlayers[0].player2.name !== "AI") {
                    currentPlayer = game.gamePlayers[0].player2;
                }
                gameBoard.gameBoardArr[index] = currentPlayer.marker;
                turn.push(null);
                displayControl.update();
                if (game.gameMode[0] === 'Easy' && game.gamePlayers[0].player2.name == "AI") {
                    easyMode.play(addMark.turn.length);
                } else if (game.gameMode[0] === 'Medium' && game.gamePlayers[0].player2.name == "AI") {
                    mediumMode.play(addMark.turn.length);
                } else if (game.gameMode[0] === 'Hard' && game.gamePlayers[0].player2.name == "AI") {
                    hardMode.play(addMark.turn.length)
                }
            }
            gameOver.check();
        }
        return { fun, turn }
    }
)()

//checks if game is over
const gameOver = (
    function() {
        const check = () => {
            let arr = [...gameBoard.gameBoardArr];
            if ((arr[0] == arr[1]) && (arr[1] == arr[2]) && (arr[2] == game.gamePlayers[0].player1.marker) ||
                (arr[3] == arr[4]) && (arr[4] == arr[5]) && (arr[5] == game.gamePlayers[0].player1.marker) ||
                (arr[6] == arr[7]) && (arr[7] == arr[8]) && (arr[8] == game.gamePlayers[0].player1.marker) ||
                (arr[0] == arr[3]) && (arr[3] == arr[6]) && (arr[6] == game.gamePlayers[0].player1.marker) ||
                (arr[1] == arr[4]) && (arr[4] == arr[7]) && (arr[7] == game.gamePlayers[0].player1.marker) ||
                (arr[2] == arr[5]) && (arr[5] == arr[8]) && (arr[8] == game.gamePlayers[0].player1.marker) ||
                (arr[0] == arr[4]) && (arr[4] == arr[8]) && (arr[8] == game.gamePlayers[0].player1.marker) ||
                (arr[2] == arr[4]) && (arr[4] == arr[6]) && (arr[6] == game.gamePlayers[0].player1.marker)) {
                let winner1 = game.gamePlayers[0].player1.name;
                game.end(winner1)
            } else if ((arr[0] == arr[1]) && (arr[1] == arr[2]) && (arr[2] == game.gamePlayers[0].player2.marker) ||
                (arr[3] == arr[4]) && (arr[4] == arr[5]) && (arr[5] == game.gamePlayers[0].player2.marker) ||
                (arr[6] == arr[7]) && (arr[7] == arr[8]) && (arr[8] == game.gamePlayers[0].player2.marker) ||
                (arr[0] == arr[3]) && (arr[3] == arr[6]) && (arr[6] == game.gamePlayers[0].player2.marker) ||
                (arr[1] == arr[4]) && (arr[4] == arr[7]) && (arr[7] == game.gamePlayers[0].player2.marker) ||
                (arr[2] == arr[5]) && (arr[5] == arr[8]) && (arr[8] == game.gamePlayers[0].player2.marker) ||
                (arr[0] == arr[4]) && (arr[4] == arr[8]) && (arr[8] == game.gamePlayers[0].player2.marker) ||
                (arr[2] == arr[4]) && (arr[4] == arr[6]) && (arr[6] == game.gamePlayers[0].player2.marker)) {
                let winner2 = game.gamePlayers[0].player2.name;
                game.end(winner2)
            } else if (!gameBoard.gameBoardArr.some(item => item === null)) {
                game.end("tie")
            }
        }
        return { check }
    }
)()

//displays game
const game = (
    function() {
        const main = document.querySelector('main')
        const winningDisplay = document.createElement('div');
        const winningPara = document.createElement('p');
        winningDisplay.setAttribute("id", 'win')
        winningDisplay.appendChild(winningPara);
        const realGameBoard = document.querySelector('table');
        const reset = document.querySelector('#reset')
        const body = document.querySelector('body');
        const gameboardContainer = document.querySelector("div#gameboard");
        const display = document.createElement('div');
        display.setAttribute('id', "display");
        const player1Display = document.createElement('div');
        player1Display.setAttribute("id", "player1")
        const player2Display = document.createElement('div');
        player2Display.setAttribute("id", "player2")
        const vsDisplay = document.createElement('div')
        const para1 = document.createElement('p');
        const para2 = document.createElement('p');
        const vs = document.createElement('p');
        let playerName1;
        let playerName2;
        let gamePlayers = [];
        const gameMode = [];
        const gameButtons = document.querySelectorAll('th');
        const start = (event) => {
            setTimeout(() => {
                const input1 = document.querySelector('#input1');
                const input2 = document.querySelector('#input2');
                const mode = document.querySelector('select')
                playerName1 = input1.value;
                if (input2 === null) {
                    playerName2 = "AI"
                    gameMode[0] = mode.value;
                } else {
                    playerName2 = input2.value;
                }
                gamePlayers[0] = playersMaker(playerName1, playerName2);
                input1.parentNode.remove();
                event.target.parentNode.remove();
                realGameBoard.classList.add('visible')
                reset.classList.add('visible')
                gameButtons.forEach(button => {
                    button.addEventListener('click', addMark.fun);
                });
                reset.onclick = chooseMode.restart;
                para1.textContent = playerName1;
                para2.textContent = playerName2;
                vs.textContent = "Vs";
                player1Display.appendChild(para1);
                player2Display.appendChild(para2);
                vsDisplay.appendChild(vs);
                player1Display.classList.add('background');
                display.appendChild(player1Display);
                display.appendChild(vsDisplay);
                display.appendChild(player2Display);
                main.insertBefore(display, gameboardContainer)
                display.classList.add('flex')
            }, 520)
        }
        const end = (name) => {
            gameButtons.forEach(button => {
                button.removeEventListener('click', addMark.fun);
            })
            main.classList.add('blur')
            body.appendChild(winningDisplay);
            winningDisplay.classList.add('winningDisplay');
            if (name === "tie") {
                winningPara.textContent = "It's a tie!";
                setTimeout(() => {
                    gameBoard.wipe();
                    displayControl.update();
                    gameButtons.forEach(button => {
                        button.addEventListener('click', addMark.fun);
                    });
                    winningDisplay.remove();
                    main.classList.remove('blur');
                    player1Display.classList.toggle('background');
                    player2Display.classList.toggle('background');
                }, 2000)
            } else {
                winningPara.textContent = `${name} has won the game!`
                setTimeout(() => {
                    gameBoard.wipe();
                    displayControl.update();
                    gameButtons.forEach(button => {
                        button.addEventListener('click', addMark.fun);
                    });
                    winningDisplay.remove();
                    main.classList.remove('blur');
                    player1Display.classList.toggle('background');
                    player2Display.classList.toggle('background');
                }, 2000)
            }
        }
        return { start, gamePlayers, end, gameMode }
    }
)()

//displays playername selection
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
        input1.setAttribute('required', '');
        input2.setAttribute('required', '')
        input2.setAttribute('type', 'text');
        input1.setAttribute('placeholder', "Enter Player 1 name");
        input2.setAttribute('placeholder', "Enter Player 2 name");
        input1.setAttribute('id', "input1");
        input2.setAttribute('id', "input2");
        start.classList.add('button');
        span.textContent = "Start";
        start.appendChild(span);
        inputs.setAttribute('id', "inputcontrol")
        const select = document.createElement('select');
        select.setAttribute('id', "modes");
        select.setAttribute('type', "modes")
        const nonOption = document.createElement('option');
        const options1 = document.createElement('option');
        const options2 = document.createElement('option');
        const options3 = document.createElement('option');
        select.appendChild(nonOption);
        nonOption.setAttribute('disabled', '');
        nonOption.setAttribute('currentvalue', '');
        nonOption.textContent = 'Choose Ai Difficulty';
        select.appendChild(options1);
        options1.setAttribute('value', 'Easy');
        options1.textContent = 'Easy';
        select.appendChild(options2);
        options2.setAttribute('value', 'Medium');
        options2.textContent = 'Medium';
        select.appendChild(options3);
        options3.setAttribute('value', 'Hard');
        options3.textContent = 'Hard';
        const playerSelection = (event) => {
            setTimeout(function() {
                event.target.parentNode.remove();
                select.remove();
                inputs.appendChild(input1);
                inputs.appendChild(input2);
                center.appendChild(start);
                div.appendChild(inputs)
                div.appendChild(center);
                start.addEventListener('click', game.start)
            }, 520)
        }
        const aiSelection = (event) => {
            setTimeout(function() {
                event.target.parentNode.remove();
                input2.remove();
                center.appendChild(start);
                inputs.appendChild(input1);
                inputs.appendChild(select);
                div.appendChild(inputs);
                div.appendChild(center);
                start.addEventListener('click', game.start)
            }, 520)
        }
        return { playerSelection, aiSelection }
    }
)()

//displays choose name page
const chooseMode = (
    function() {
        const realGameBoard = document.querySelector('table');
        const reset = document.querySelector('#reset');
        const begin = () => {
            const div = document.querySelector('div#gameboard');
            const players = document.createElement('button');
            players.setAttribute('id', "players");
            players.textContent = "Player vs Player"
            const ai = document.createElement('button');
            ai.textContent = "Player vs AI"
            ai.setAttribute('id', "ai");
            const mode = document.createElement('div');
            mode.setAttribute('id', "mode");
            mode.appendChild(players);
            mode.appendChild(ai);
            div.appendChild(mode);
            players.addEventListener('click', choseNames.playerSelection)
            ai.addEventListener('click', choseNames.aiSelection)
        }
        const restart = () => {
            window.location.reload();
        }
        return { begin, restart }
    }
)()
chooseMode.begin()

const easyMode = (
    function() {
        const play = (aiturn) => {
            if (aiturn % 2 !== 0) {
                const available = [];
                for (let i = 0; i < gameBoard.gameBoardArr.length; i++) {
                    if (gameBoard.gameBoardArr[i] === null) {
                        available.push(i);
                    }
                }
                let random = Math.floor(Math.random() * available.length);
                gameBoard.gameBoardArr[available[random]] = game.gamePlayers[0].player2.marker;
                displayControl.update();
                addMark.turn.push(null);
            }
        }
        return { play }
    }
)()

const hardMode = (
    function() {
        const play = (aiturn) => {
            if (aiturn % 2 !== 0) {
                function movesLeft(board) {
                    for (let i = 0; i < board.length; i++) {
                        if (board[i] === null) {
                            return true;
                        }
                    }
                    return false;
                }

                function evaluate(arr) {
                    if ((arr[0] == arr[1]) && (arr[1] == arr[2]) && (arr[2] == game.gamePlayers[0].player1.marker) ||
                        (arr[3] == arr[4]) && (arr[4] == arr[5]) && (arr[5] == game.gamePlayers[0].player1.marker) ||
                        (arr[6] == arr[7]) && (arr[7] == arr[8]) && (arr[8] == game.gamePlayers[0].player1.marker) ||
                        (arr[0] == arr[3]) && (arr[3] == arr[6]) && (arr[6] == game.gamePlayers[0].player1.marker) ||
                        (arr[1] == arr[4]) && (arr[4] == arr[7]) && (arr[7] == game.gamePlayers[0].player1.marker) ||
                        (arr[2] == arr[5]) && (arr[5] == arr[8]) && (arr[8] == game.gamePlayers[0].player1.marker) ||
                        (arr[0] == arr[4]) && (arr[4] == arr[8]) && (arr[8] == game.gamePlayers[0].player1.marker) ||
                        (arr[2] == arr[4]) && (arr[4] == arr[6]) && (arr[6] == game.gamePlayers[0].player1.marker)) {
                        return -10;
                    } else if ((arr[0] == arr[1]) && (arr[1] == arr[2]) && (arr[2] == game.gamePlayers[0].player2.marker) ||
                        (arr[3] == arr[4]) && (arr[4] == arr[5]) && (arr[5] == game.gamePlayers[0].player2.marker) ||
                        (arr[6] == arr[7]) && (arr[7] == arr[8]) && (arr[8] == game.gamePlayers[0].player2.marker) ||
                        (arr[0] == arr[3]) && (arr[3] == arr[6]) && (arr[6] == game.gamePlayers[0].player2.marker) ||
                        (arr[1] == arr[4]) && (arr[4] == arr[7]) && (arr[7] == game.gamePlayers[0].player2.marker) ||
                        (arr[2] == arr[5]) && (arr[5] == arr[8]) && (arr[8] == game.gamePlayers[0].player2.marker) ||
                        (arr[0] == arr[4]) && (arr[4] == arr[8]) && (arr[8] == game.gamePlayers[0].player2.marker) ||
                        (arr[2] == arr[4]) && (arr[4] == arr[6]) && (arr[6] == game.gamePlayers[0].player2.marker)) {
                        return 10;
                    } else if (!arr.some(item => item === null)) {
                        return 0;
                    }
                }

                function minimax(board, depth, player) {
                    let score = evaluate(board);

                    if (score === 10) {
                        return score - depth;
                    }

                    if (score === -10) {
                        return score + depth;
                    }

                    if (movesLeft(board) === false) {
                        return 0;
                    }

                    if (player === "aiPlayer") {
                        let best = -1000;
                        for (let i = 0; i < 9; i++) {
                            if (board[i] === null) {
                                board[i] = "o"
                                best = Math.max(best, minimax(board, depth + 1, "humanPlayer"));
                                board[i] = null;
                            }
                        }
                        return best;
                    } else if (player === "humanPlayer") {
                        let best = 1000;
                        for (let i = 0; i < 9; i++) {
                            if (board[i] === null) {
                                board[i] = "x"
                                best = Math.min(best, minimax(board, depth + 1, 'aiPlayer'));
                                board[i] = null;
                            }
                        }
                        return best
                    }
                }

                function findBest(board) {
                    let bestVal = -1000;
                    let bestMove = 0;
                    for (let i = 0; i < 9; i++) {
                        if (board[i] === null) {
                            board[i] = "o";
                            let moveVal = minimax(board, 0, 'humanPlayer');
                            board[i] = null;

                            if (moveVal > bestVal) {
                                bestMove = i;
                                bestVal = moveVal;
                            }
                        }
                    }
                    return bestMove
                }
                let extra = [...gameBoard.gameBoardArr]
                let index = findBest(extra);
                if (gameBoard.gameBoardArr[index] === null) {
                    gameBoard.gameBoardArr[index] = game.gamePlayers[0].player2.marker;
                    displayControl.update();
                    addMark.turn.push(null);
                }
            }
        }
        return { play }
    }
)()

const mediumMode = (
    function() {
        const play = (aiturn) => {
            if (aiturn % 2 !== 0) {
                let chance = Math.floor(Math.random() * 100);
                if (chance > 50) {
                    hardMode.play(aiturn);
                } else {
                    easyMode.play(aiturn);
                }
            }
        }
        return { play }
    }
)()