function buildBoard() {
	var board = [];
	for (var i = 0; i < gLevel.SIZE; i++) {
		board[i] = [];
		for (var j = 0; j < gLevel.SIZE; j++) {
			var cell = createCell()
			board[i][j] = cell;
		}
	}
	return board;
}

// the model

function createCell(){
    return {
        minesAroundCount: null,
        isShown: false, 
        isMine: false, 
        isMarked: true 
    };

}

function renderBoard() {
	var strHTML = '';
	for (var i = 0; i < gBoard.length; i++) {
		strHTML += `<tr class="table" >`;
		for (var j = 0; j < gBoard[0].length; j++) {
			var cell = gBoard[i][j];
			var className = '';
			if (cell.isShown) {
				className = 'cell';
				cell = cell.isMine ? MINE : cell.minesAroundCount;
			} else {
				className = 'cell';
				cell = '';
			}
			var cellID = 'cell ' + i + ',' + j;
			strHTML += `<td class="cell ${className}"
			onclick="cellClicked(this, ${i}, ${j})" id="${cellID}">${cell}</td>`
				
		}
		strHTML += `</tr>`;
	}
	var elTable = document.querySelector('.cells');
	elTable.innerHTML = strHTML;
}


function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffle(items) {
	var randIdx, keep;
	for (var i = items.length - 1; i > 0; i--) {
		randIdx = getRandomIntInclusive(0, items.length - 1);

		keep = items[i];
		items[i] = items[randIdx];
		items[randIdx] = keep;
	}
	return items;
}


// var time = setInterval(countSec, 1000)
// function countSec() {
// 	console.log(gGame.secsPassed++);
// }
// var showSec = document.querySelector('.timer')
// showSec.innerText = gGame.secsPassed

// clearInterval(time)