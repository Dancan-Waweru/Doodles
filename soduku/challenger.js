export function valid(cell) {

    let value = cell.textContent;

    // find classes safely
    let rowClass = [...cell.classList].find(c => c.startsWith("r"));
    let colClass = [...cell.classList].find(c => c.startsWith("c"));
    let blockClass = [...cell.classList].find(c => c.startsWith("b"));

    // ROW CHECK
    let rowCells = document.querySelectorAll("." + rowClass);
    for (let c of rowCells) {
        if (c !== cell && c.textContent === value) {
            alert("that value exists in the row");
            cell.textContent = "";
            return false;
        }
    }

    // COLUMN CHECK
    let colCells = document.querySelectorAll("." + colClass);
    for (let c of colCells) {
        if (c !== cell && c.textContent === value) {
            alert("that value exists in the column");
            cell.textContent = "";
            return false;
        }
    }

    // BLOCK CHECK
    let blockCells = document.querySelectorAll("." + blockClass);
    for (let c of blockCells) {
        if (c !== cell && c.textContent === value) {
            alert("that value exists in the block");
            cell.textContent = "";
            return false;
        }
    }

    return true;
}