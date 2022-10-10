let _puzzleNumbers;
let _moveCount;
let _gameStartTime;


for (let i = 0; i < 16; i++) {
    let nextElement = document.getElementById(`key${i}`);
    nextElement.parentElement.addEventListener('click', () => movePuzzle(nextElement.textContent));
}

document.getElementById('startGame').parentElement.addEventListener('click', resetGame);

function resetGame() {
    _moveCount = 0;
    _puzzleNumbers = [];
    _gameStartTime = new Date()
    fillRandom();
    refreshPuzzleView();
    let x = setInterval(() => {
        let now = new Date();
        let distance = now - _gameStartTime;
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById('timeElipsed').textContent = `Time elipsed: ${pad(minutes, 2)}:${pad(seconds, 2)}`;
        if (isGameOver() || minutes > 59) {
            clearInterval(x);
        }
    }, 1000);
}

function fillRandom() {
    let nextNumber;
    for (let i = 0; i < 16; i++) {
        do {
            nextNumber = Math.trunc(Math.random() * 16);
        } while (isExists(nextNumber))
        _puzzleNumbers[i] = nextNumber;
    }
}

function isExists(number) {
    for (let i = 0; i < 16; i++) {
        if (number === _puzzleNumbers[i]) return true;
    }
    return false;
}

function refreshPuzzleView() {
    for (let i = 0; i < 16; i++) {
        let nextKey = document.getElementById(`key${i}`);
        nextKey.textContent = _puzzleNumbers[i];
        if (_puzzleNumbers[i] === 0) {
            nextKey.parentElement.style.visibility = 'hidden';
        } else {
            nextKey.parentElement.style.visibility = 'visible';
        }
    }
    document.getElementById('moveCount').textContent = `Move count: ${_moveCount}`;
}

function movePuzzle(puzzleNumber) {
    if (isGameOver()) {
        alert('*** GAME OVER ***');
        return;
    }

    for (let i = 0; i < 16; i++) {
        if (_puzzleNumbers[i] === +puzzleNumber) {
            moveIfParentZero(i);
            refreshPuzzleView();
            return;
        }
    }

}

function moveIfParentZero(index) {
    let shifts = [
        ((index + 1) % 4 != 0 ? 1 : 0), 
        ((index) % 4 != 0 ? -1 : 0), 
        4, 
        -4];
    for (let i = 0; i < shifts.length; i++) {
        if (_puzzleNumbers[index + shifts[i]] === 0) {
            _puzzleNumbers[index + shifts[i]] = _puzzleNumbers[index];
            _puzzleNumbers[index] = 0;
            _moveCount++;
            return;
        }
    }
}

function isGameOver() {
    for (let i = 0; i < 15; i++) {
        if (_puzzleNumbers[i] !== i + 1) return false;
    }
    return true;
}

function pad(num, size) {
    var s = "000000000" + num;
    return s.substring(s.length - size);
}