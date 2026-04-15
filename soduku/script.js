let main=document.getElementById("main");
let a=document.createElement("p");
a.textContent="hello conflicting world!";
main.appendChild(a);


function generateTable(){
    let address=0;
    let blocks=["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    let table=document.createElement("table");
    for (let i = 0; i <= 8; i++) {
        let tr=document.createElement("tr")
        for (let j = 0; j <=8; j++) {
            let td=document.createElement("td");
            let count=i*j;

            tr.appendChild(td);

            let row=Math.floor(address/9);
            let column=address%9;

            let block=Math.floor(row/3)*3 + Math.floor(column/3);

            console.log(block);
            td.textContent=`${block}`;
            address+=1;
            
            td.classList.add(blocks[block]);


        }
        table.appendChild(tr);
    }
    main.appendChild(table);
    
}   

generateTable();