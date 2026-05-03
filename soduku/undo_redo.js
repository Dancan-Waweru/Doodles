let redo = [];
let undo = [];

export function saveHistory(index, previousValue) {
    undo.push([index, previousValue]);
    redo = []; // clear redo on new action
}

export function past() {
    let change = undo.pop();
    if (!change) return;

    let [target, previousValue] = change;

    let currentValue = target.textContent;

    // revert
    target.textContent = previousValue;

    // store redo using CURRENT value
    redo.push([target, currentValue]);
}

export function future() {
    let change = redo.pop();
    if (!change) return;

    let [target, valueToRestore] = change;

    let currentValue = target.textContent;

    // apply redo
    target.textContent = valueToRestore;

    // push back into undo
    undo.push([target, currentValue]);
}

export function clearRedo(){
    redo=[];
}


