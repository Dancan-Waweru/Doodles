import {past, future, saveHistory, clearRedo} from "./undo_redo.js";
import { valid } from "./challenger.js";

// inside your module file
let currentTarget = null;

export function CTC(target){
    currentTarget = target;

    //first assumimng the container exists and you want to remove it
    document.querySelectorAll(".dropDown")
    .forEach(el => el.remove("dropDown"));

    let dropDown=document.createElement("div");
    dropDown.classList.add("dropDown");
    //and then the contents of your drop down;
    let list=document.createElement("ul");
    for(let i=1; i<10; i++){
        let li=document.createElement("li");
        let button=document.createElement("button")
        button.textContent=i;
        button.classList.add("numPad");
        button.addEventListener("click", ()=> {
            setTimeout(saveHistory(currentTarget, currentTarget.textContent), 500);
            changeText(target, button.textContent);
            
        });
        li.appendChild(button)
        list.appendChild(li);
    }
    dropDown.appendChild(list)

    let rect=target.getBoundingClientRect();

   
    dropDown.style.top=rect.bottom+"px";
    document.body.appendChild(dropDown);
}


export function changeText(target, value){
    if (target.dataset.fixed === "true") {
        alert("you can't change fixed values");
        return; // block editing
    }
    target.textContent=value;
    valid(target);
    
    
}

export function handleKeyInput(event){
    if (!currentTarget) return;

    if (event.key >= "1" && event.key <= "9") {
        setTimeout(saveHistory(currentTarget, currentTarget.textContent), 500);
        clearRedo();
        changeText(currentTarget, event.key);
    }

    
}