import { board } from "./board.js";

function createStructures() {//this function initializes the data structures for rows, columns, and blocks. Each of these structures will hold the missing values for their respective row, column, or block, which will be used in the constraint propagation process to determine possible values for empty cells.

    let rows = [];
    let cols = [];
    let blocks = [];

    for(let i = 0; i < 9; i++) {

        rows.push([]);
        cols.push([]);
        blocks.push([]);

    }

    return { rows, cols, blocks };
}



function findMissingValues(arr) {//find missing values in a given array (row, column, or block) and return them as an array. This function checks which numbers from 1 to 9 are not present in the input array and collects those missing numbers.

    let missing = [];

    for(let i = 1; i <= 9; i++) {

        if(!arr.includes(i)) {

            missing.push(i);

        }
    }

    return missing;
}

function constraintPropagation(board, rows, cols, blocks) {//this function updates the rows, cols, and blocks arrays based on the current state of the board. It identifies which numbers are missing from each row, column, and 3x3 block, which helps in determining the possible values for empty cells.

    // ROWS
    for(let row = 0; row < 9; row++) {

        rows[row] = findMissingValues(board[row]);

    }

    // COLS
    for(let col = 0; col < 9; col++) {

        let column = [];

        for(let row = 0; row < 9; row++) {

            column.push(board[row][col]);

        }

        cols[col] = findMissingValues(column);

    }

    // BLOCKS
    let blockIndex = 0;

    for(let startRow = 0; startRow < 9; startRow += 3) {

        for(let startCol = 0; startCol < 9; startCol += 3) {

            let block = [];

            for(let r = startRow; r < startRow + 3; r++) {

                for(let c = startCol; c < startCol + 3; c++) {

                    block.push(board[r][c]);

                }
            }

            blocks[blockIndex] =
                findMissingValues(block);

            blockIndex++;

        }
    }
}

function getBlockIndex(row, col) {

    return Math.floor(row / 3) * 3 +
           Math.floor(col / 3);

}

function intersect(a, b, c) {

    return a.filter(value =>

        b.includes(value) &&
        c.includes(value)

    );

}

function isSolved(board) {//check whether there are any empty cells left

    for(let row = 0; row < 9; row++) {

        for(let col = 0; col < 9; col++) {

            if(board[row][col] === 0) {

                return false;

            }
        }
    }

    return true;
}

export function solve() {
        let { rows, cols, blocks } =
        createStructures();

    constraintPropagation(
        board,
        rows,
        cols,
        blocks
    );

    let changed = true;//this variable is used to check whether any changes were made to the board during an iteration of the while loop. If no changes were made, it means that no further progress can be made using constraint propagation alone, and the loop will terminate.

    while(changed) {

        changed = false;

        // refresh constraints
        constraintPropagation(
            board,
            rows,
            cols,
            blocks
        );

        for(let row = 0; row < 9; row++) {

            for(let col = 0; col < 9; col++) {

                // skip filled cells
                if(board[row][col] !== 0) {

                    continue;

                }

                let blockIndex =
                    getBlockIndex(row, col);

                let possibleValues = intersect(

                    rows[row],
                    cols[col],
                    blocks[blockIndex]

                );

                // only one possible value
                if(possibleValues.length === 1) {

                    board[row][col] =
                        possibleValues[0];

                    changed = true;

                }
            }
        }
    }

    if(isSolved(board)) {

        console.log("Solved!");

    } else {

        console.log(
            "Stopped. More advanced solving needed."
        );

    }

    return board;
}