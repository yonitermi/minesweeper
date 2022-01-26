'use strict'


function renderBoard(board) {
    
    var strHTML = `<table>`;
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>`;
        for (var j = 0; j < board[0].length; j++) {

            var cell = board[i][j]
            strHTML += `<td>${cell}</td>`
        }
        strHTML += `</tr>`
    }
    strHTML += `</table>`;
    var elTable = document.querySelector('.board')
    elTable.innerHTML = strHTML

}




function createMat(ROWS, COLS) {
    var mat = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Select the elCell and set the value
function renderCell(location, value) {
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
    elCell.innerHTML = value;
}