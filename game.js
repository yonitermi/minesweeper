const MINE = '💣';
const FLAG = '🚩';
var gBoard;

var gGame = {
    isOn: false,  // isOn: when true we let the user play
    shownCount: 0,  // How many cells are shown
    markedCount: 0,  // marked cells with flag
    firstMove: true,
    secsPassed: 0 //seconds passed from beginnig
};

var gLevel = {
    SIZE: 4,  //board size
    MINES: 2  // mines in board
};

function init() {
    gGame.shownCount = 0;
    gGame.firstMove = true;
    gGame.isOn = true;
    gBoard = buildBoard();
    renderBoard();
    setMinesNegsCount()
    addMinesRandom(gLevel.MINES)
    countNeighbors()

}

function createDiffLevel(size, mines) {
    gLevel.SIZE = size;
    gLevel.MINES = mines;
    init();
}



//count mines and updating(minesAroundCount.) each cell 
// according to the mines next to him
function setMinesNegsCount() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            gBoard[i][j].minesAroundCount = countNeighbors(i, j);
        }   // mines next to specific cell = function from class checking for Neighbors
    }
    console.log(gBoard);
}

function countNeighbors(rowIdx, colIdx) {
    var neighborsCount = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue; // if its outline the matrix next iteration
        for (var j = colIdx - 1; j <= colIdx + 1; j++) { //runing on 8 cell next  
            if (j < 0 || j >= gBoard[i].length) continue; // if its outline the matrix next iteration
            if (i === rowIdx && j === colIdx) continue; // if it is the cell himself continue
            if (gBoard[i][j].isMine) neighborsCount++; // if its is a mine increase count
        }
    }
    return neighborsCount;
}

function cellClicked(elCell, i, j) {
    var cell = gBoard[i][j];
    
    if (gGame.firstTurn) {
        cell.isMine = false;
        cell.innerHTML !== MINE;
        elCell.innerHTML = cell.minesAroundCount;
        gGame.firstTurn = false;
        cellClicked(elCell, i, j);
    }

    if (cell.isMine) {
        elCell.innerHTML = MINE;
        cell.isMarked = true;
        // init()
    } else {
        elCell.innerHTML = cell.minesAroundCount;
    }

    gGame.shownCount++;

    var count = document.querySelector('.counter')
    count.innerHTML = 'moves : ' + gGame.shownCount

}


var count = document.querySelector('.counter')
count.innerHTML = 'moves : ' + gGame.shownCount

var playTime = querySelector('.timer')
playTime.innerHTML = countTime()

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

