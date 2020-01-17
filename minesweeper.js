// Function to make array of arrays.
function make2DArray(cols, rows) {
  var arr = new Array(cols + 2);
  for (var i = 0; i < cols + 2; i++) {
    arr[i] = new Array(rows + 2);
  }
  return arr;
}

var mines = 20;
var rows = 10;
var cols = 10;

// Grid with 1 wide buffer for checking edge cases later.
grid = make2DArray(cols + 2, rows + 2);

// Initialise grid with 0s.
for(var x = 0; x < rows + 2; x++) {
    for(var y = 0; y < cols + 2; y++){
        grid[x][y] = 0;
    }
}

// Place bombs at random on the board.
for (var i = 0; i < mines; i++) {
    var x  = Math.floor(Math.random() * cols + 1);
    var y = Math.floor(Math.random() * rows + 1);
    if(grid[x][y] != 1) {
        grid[x][y] = 1;
    } else {
        // if duplicate position try again.
        i--;
    }
    
}

// Function to check the 8 spaces around a given coordinate on the board.
function checkAdj(x, y, board) {
    var result = [];
    for (var dx = -1; dx <= 1; dx++) {
        for (var dy = -1; dy <= 1; dy++) {
            if (dx != 0 || dy != 0) {
               result.push(board[x + dx][y + dy]);
            }
        }
    }
    return result;
}

viewBoard = make2DArray(cols, rows);

// Fill displayed board with adjacent numbers and B for bomb.
for(var x = 1; x <= rows; x++) {
    for(var y = 1; y <= cols; y++){        
        if(grid[x][y] != 1) {
            viewBoard[x][y] = checkAdj(x, y, grid).reduce(reduceFunc);
        } else {
            viewBoard[x][y] = 'X';
        }
    }
}

// Remove redundant 0s from board.

for(var x = 1; x <= rows; x++) {
    for(var y = 1; y <= cols; y++){        
        if(viewBoard[x][y] == 0 && checkAdj(x, y, grid).reduce(reduceFunc) == 0) {
            viewBoard[x][y] = ' ';
        }
    }
}

// Function for summing an array.
function reduceFunc(total, num) {
  return total + num;
}

// Print board and parameters with HTML.
function displayBoard(table){
    document.write("<h3> height:", rows ," width:", cols, " mines:", mines, "</h3>")
    document.write("<TABLE BORDER=ON>");
    for(x = 1; x < rows + 1; x++) {
        for(y = 1; y < cols + 1; y++){
            if(table[x][y] == 1) {
                document.write("<TD style='color:blue'>",1,"</TD>");
            } else if (table[x][y] == 2) {
                document.write("<TD style='color:green'>",2,"</TD>");
            } else if (table[x][y] >= 3) {
                document.write("<TD style='color:red'>",table[x][y],"</TD>");
            } else {
                document.write("<TD>",table[x][y],"</TD>");
            }
        }
        document.write("</TR>");
    }
    document.write("</TABLE>");
}

displayBoard(viewBoard);