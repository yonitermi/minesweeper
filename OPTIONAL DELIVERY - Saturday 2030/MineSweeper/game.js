const MINE = '💣';
const FLAG = '🚩';
var gBoard;

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
};

var gLevel = {
    SIZE: 4,
    MINES: 2
};

function init() {
    gGame.shownCount = 0;
    gGame.firstMove = true;
    gGame.isOn = true;
    gBoard = buildBoard();
    renderBoard();
    addMinesRandom(gLevel.MINES);
    setMinesNegsCount();
    countNeighbors()
}

function createDiffLevel(size, mines) {
    gLevel.SIZE = size;
    gLevel.MINES = mines;
    init();
}

function setMinesNegsCount() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            gBoard[i][j].minesAroundCount = countNeighbors(i, j);
        }
    }
}

function countNeighbors(rowIdx, colIdx) {
    var neighborsCount = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue; // if its outline the matrix next iteration
        for (var j = colIdx - 1; j <= colIdx + 1; j++) { //runing on 8 cell next  
            if (j < 0 || j >= gBoard[i].length) continue; // if its outline the matrix next iteration
            if (i === rowIdx && j === colIdx) continue; // if it is the cell himself continue
            if (gBoard[i][j].isMine) {
                neighborsCount++;
            } // if its is a mine increase count
        }
    }
    return neighborsCount;
}

function cellClicked(elCell, i, j) {
    var cell = gBoard[i][j];
    if (cell.isMine) {
        elCell.innerHTML = MINE;
    } else {
        // console.log(cell.minesAroundCount)
        elCell.innerHTML = cell.minesAroundCount; // show count 
        // console.log(cell.minesAroundCount)
        if (cell.minesAroundCount === 0) {
            // console.log('reval')
            elCell.innerHTML = ''
            // revalCells(elCell, i, j);
        } 
    }
    cell.isShown = true;      // setting every click to be shown.
    gGame.shownCount++;

    var count = document.querySelector('.counter')
    count.innerHTML = 'moves : ' + gGame.shownCount
}

function addMinesRandom(minesAmount) {
    var arrEmptyCells = getEmptyCells();
    for (var i = 0; i < minesAmount; i++) {
        var Idx = getRandomIntInclusive(0, arrEmptyCells.length - 1);
        var location = arrEmptyCells[Idx];
        //update model -
        gBoard[location.i][location.j].isMine = true;
        // 	//update DOM -
    }
}

function getEmptyCells() {
    var emptyCellsArray = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var emptyCell = gBoard[i][j];
            if (!emptyCell.isMine) {  // if there is no mine 
                emptyCellsArray.push({ i, j }); // push to a new array
            }
        }
    }
    return emptyCellsArray;
}



function revalCells(elCell, rowIdx, colIdx) { // 0 0
    // console.log(colIdx);
    // console.log(rowIdx);
    if (gBoard[rowIdx][colIdx].isShown) {
        // console.log('retun');
        return;
    }
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        // console.log('first for');
        if (i < 0 || i >= gBoard.length) continue; // if its outline the matrix next iteration
        for (var j = colIdx - 1; j <= colIdx + 1; j++) { //runing on 8 cell next
            // console.log('secound for');
            if (j < 0 || j >= gBoard[i].length) continue; // if its outline the matrix next iteration
            if (i === rowIdx && j === colIdx) continue; // if it is the cell himself continue
            if (gBoard[i][j].minesAroundCount > 0 && !gBoard[i][j].isMine) { // number
                // console.log('number');
                // console.log(i);
                // console.log(j);
                // console.log(gBoard[i][j])
                // var cell = gBoard[i][j];
                elCell.innerHTML = cell.minesAroundCount;
                gBoard[i][j].isShown = true;
                // cellClicked()
            } else if (gBoard[i][j].minesAroundCount === 0) { // 0
                // console.log('zero');
                // console.log(i);
                // console.log(j);
                // console.log(gBoard[i][j])
                // var cell = gBoard[i][j];
                elCell.innerHTML = cell.minesAroundCount;
                gBoard[i][j].isShown = true;
                revalCells(elCell, i, j);
            }
        }
    }
    return;
}
