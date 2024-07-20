let display=document.getElementById("turn");
let boxes=document.querySelectorAll(".box");
let resetbutton=document.getElementById("reset");
resetbutton.onclick=()=>{
    document.location.reload();
}
// let a=document.getElementById("1")
let turn="Player 1";
const winpatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
// a.onclick=()=>{
//     alert("box was clicked");
// }
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("box was clicked");
        if(turn=="Player 1"){
            box.innerText="X";
            turn="Player 2";
            display.innerText=turn;
            console.log("box was clicked by Player 1");
        }else if(turn=="Player 2"){
            box.innerText="O";
            turn="Player 1";
            display.innerText=turn;
            console.log("box was clicked by player 2");
        }box.disabled=true;
        checkwinner();
    })
})
const checkwinner=()=>{
for(let pattern of winpatterns){
    let pos1=boxes[pattern[0]].innerText;
    let pos2=boxes[pattern[1]].innerText;
    let pos3=boxes[pattern[2]].innerText;
    if(pos1!=""&&pos2!=""&&pos3!=""){
        if(pos1==pos2&&pos2==pos3){
            setTimeout(() => {
                alert(turn+" is winner");
            }, 500);
            display.innerText=turn+" is winner";
            display.style.backgroundColor="green";
            for(let box of boxes){
                box.disabled=true;
            }
        }
    }
}
}