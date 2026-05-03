
export let board = [
    [5,3,0, 0,7,0, 0,0,0],
    [6,0,0, 1,9,5, 0,0,0],
    [0,9,8, 0,0,0, 0,6,0],
  
    [8,0,0, 0,6,0, 0,0,3],
    [4,0,0, 8,0,3, 0,0,1],
    [7,0,0, 0,2,0, 0,0,6],
  
    [0,6,0, 0,0,0, 2,8,0],
    [0,0,0, 4,1,9, 0,0,5],
    [0,0,0, 0,8,0, 0,7,9]
  ];

  export function loadBoardToUI(board) {

    // grab all table cells (td) from the DOM
    let cells = document.querySelectorAll("td");

    // loop through rows
    for (let row = 0; row < 9; row++) {

        // loop through columns
        for (let col = 0; col < 9; col++) {

            // convert (row,col) → index
            let index = row * 9 + col;

            let value=board[row][col];

            // set UI value (0 becomes empty)
            cells[index].textContent = board[row][col] || "";

            if(value){
                cells[index].dataset.fixed = value !== 0;
            }
        }
    }
}