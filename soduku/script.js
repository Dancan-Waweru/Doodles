import { CTC, handleKeyInput } from "./drop-down.js";
import {past, future, saveHistory, clearRedo} from "./undo_redo.js";
import { board, loadBoardToUI } from "./board.js";

document.addEventListener("keydown", handleKeyInput);

let main=document.getElementById("main");
let a=document.createElement("p");
a.textContent="hello conflicting world!";
main.appendChild(a);


function generateTable() {
    let address = 0;
    let blocks = ["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9"];
    let table = document.createElement("table");

    for (let i = 0; i <= 8; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j <= 8; j++) {
            let td = document.createElement("td");
            tr.appendChild(td);

            let row = Math.floor(address / 9);
            let column = address % 9;
            let block = Math.floor(row / 3) * 3 + Math.floor(column / 3);

            td.textContent = `${block}`;
            td.classList.add(blocks[block], "c" + column, "r" + row);
            
            // Add click listener so highlight actually runs
            td.addEventListener('click', () => highlight(td));
            
            address += 1;
        }
        table.appendChild(tr);
    }
    document.getElementById('main').appendChild(table);
}

function highlight(cell) {
    // 1. Clear previous highlights
    document.querySelectorAll(".highlight, .col, .row, .cell").forEach(el => {
        el.classList.remove("highlight", "col", "row", "cell");
    });

    // 2. Identify classes
    let classes = [...cell.classList];
    let block = classes.find(c => c.startsWith("b"));
    let col = classes.find(c => c.startsWith("c"));
    let row = classes.find(c => c.startsWith("r"));

    // 3. Apply new highlights (Fixed the row syntax error here)
    
    document.querySelectorAll(`.${col}`).forEach(el => el.classList.add("col"));
    document.querySelectorAll(`.${row}`).forEach(el => el.classList.add("row"));
    document.querySelectorAll(`.${block}`).forEach(el => el.classList.add("highlight"));
    // 4. Highlight the specific selected cell
    cell.classList.add("cell");
}

generateTable();

// Ensure the DOM is fully loaded before selecting elements
document.addEventListener("DOMContentLoaded", () => {
    // Convert HTMLCollection to Array
    let cells = Array.from(document.getElementsByTagName("td")); 
    
    cells.forEach(c => {
        c.addEventListener("pointerdown", () => {highlight(c);
            CTC(c);
        });
        c.addEventListener("mouseover", () => {highlight(c);
        });
        c.addEventListener("pointerenter", e =>{
            if(e.buttons===1){
                highlight(c);
            }
        })
    });
});

function redo_undo(){
    let container=document.createElement("div");
    let buttonA=document.createElement("button");
    let buttonB=document.createElement("button");

    buttonA.textContent="undo";
    buttonB.textContent="redo";

    buttonA.addEventListener("click", ()=>{past()});
    buttonB.addEventListener("click", ()=>{future()});

    container.appendChild(buttonA);
    container.appendChild(buttonB);

    document.body.appendChild(container);

}

redo_undo();

loadBoardToUI(board);