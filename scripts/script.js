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

const personFactory = (name) => {
    return { name }
}

const displayControl = (
    function() {
        let x = 0;
        const ths = document.querySelectorAll('th');
        const update = () => {
            ths.forEach(th => {
                th.textContent = gameBoard.gameBoardArr[x];
                x++
            })
            x = 0;
        }
        return {
            update
        }
    }
)()

const addMark = (
    function() {
        let x = 1;
        const fun = (event) => {
            let index = parseInt(event.target.classList.value) - 1;
            if (gameBoard.gameBoardArr[index] === null) {
                if (x % 2 === 0) {
                    gameBoard.gameBoardArr[index] = "x"
                } else {
                    gameBoard.gameBoardArr[index] = "o"
                }
                x++
            }
            displayControl.update()
        }
        return { fun }
    }
)()

const buttons = document.querySelectorAll('th');
buttons.forEach(button => {
    button.addEventListener('click', addMark.fun)
})