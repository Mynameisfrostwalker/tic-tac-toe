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
        ths.forEach(th => {
            th.textContent = gameBoard.gameBoardArr[x];
            x++
        })
    }
)()