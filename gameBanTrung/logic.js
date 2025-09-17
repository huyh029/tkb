class Egg {
    constructor(x = 0, y = 0, c = 1) {
        this.x = x;
        this.y = y;
        this.c = c;
        
    }
}

var arrEgg = [];
var isEvenRow = 0;
var n = 0;
var desEgg = []
var desCount = 0 
var statusEgg =[]
var head = [] 
var visited = []
// document.addEventListener("keydown",e=>{
//     addRowEgg()
//     show()
// })
addRowEgg()
show()
document.querySelector(".shoot").addEventListener("click",e=>{
    var e = new Egg(parseInt(document.querySelector(".x").value),
  parseInt(document.querySelector(".y").value),
  parseInt(document.querySelector(".c").value)
)
// console.log(arrEgg);
updateGridEgg(e)
addRowEgg()
show()
if(isFinishGame()){
    document.querySelector(".container").innerHTML="<h1> game over</h1>"
}
})
























function rand(){
    return Math.floor(Math.random() * 4) + 1;
}
function addRowEgg(){
    for(var i=0;i<n;i++){
        arrEgg[i].y+=32;
    }
    var addCount=(isEvenRow==0?7:6);
    n+=addCount;
    isEvenRow=1-isEvenRow
    for(var i=0;i<addCount;i++){
        arrEgg.push(new Egg(32*i-isEvenRow*16+24,0,rand()));
    }
}

function destroy(e){
    console.log(e);
    
    for(var i=0;i<n;i++){
        if(isCollide(arrEgg[i],e)&&arrEgg[i].c==e.c&&visited[i]==0){
            desEgg.push(i)
            desCount++
            visited[i]=1
            destroy(arrEgg[i])
        }
    }
}
function updateStatus(e){
    for(var i=0;i<n;i++){
        if(isCollide(e,arrEgg[i])&&statusEgg[i]==0){
            statusEgg[i]=2
            updateStatus(arrEgg[i])
        } 
    }
}
function standardization(e){
    for(var i=0;i<n;i++){
        if(isCollide(arrEgg[i],e)){
            // var x1 = arrEgg[i].x+16, y1 = arrEgg[i].y+32
            // var x2 = arrEgg[i].x-16, y2 = arrEgg[i].y+32
            // var x3 = arrEgg[i].x+32, y3 = arrEgg[i].y
            // var x4 = arrEgg[i].x-32, y4 = arrEgg[i].y
            // var x5 = arrEgg[i].x+16, y5 = arrEgg[i].y-32
            // var x6 = arrEgg[i].x-16, y6 = arrEgg[i].y-32
            var x = [arrEgg[i].x+16,arrEgg[i].x-16,arrEgg[i].x+32,arrEgg[i].x-32,arrEgg[i].x+16,arrEgg[i].x-16]
            var y = [arrEgg[i].y+32,arrEgg[i].y+32,arrEgg[i].y,arrEgg[i].y,arrEgg[i].y-32,arrEgg[i].y-32]
            var indexMin = 0
            var Min = distance(e,x[0],y[0]) 
            for(var j=1;j<6;j++){
                if(Min>distance(e,x[j],y[j])){
                    indexMin = j
                    Min = distance(e,x[j],y[j])
                }
            }
            e.x=x[indexMin]
            e.y=y[indexMin]
            return
        }
    }
}
function distance(e,x,y){
    return (e.x-x)*(e.x-x)+(e.y-y)*(e.y-y)
}
function updateGridEgg(e){
    standardization(e)
    var tmp = []
    var tmpn=0
    for(var i=0;i<n;i++){
        if(arrEgg[i].c<5) {tmp.push(arrEgg[i]);tmpn++}
    }
    arrEgg.length=0
    arrEgg = tmp
    n=tmpn
    head.length=0
    desEgg.length=0
    desCount=0
    desEgg.push(n)
    desCount=1
    n+=1
    arrEgg.push(e)
    visited.length=0
    for(var i=0;i<n;i++){
        visited.push(0)
    }
    visited[n-1]=1
    destroy(e)
    if(desCount<3) return
    statusEgg.length=0
    for(var i=0;i<n;i++){
        statusEgg.push(0)
    }
    for(var i=0;i<desCount;i++){
        statusEgg[desEgg[i]]=1
    }
    for(var i=0;i<n;i++){
        if(statusEgg[i]==0&&arrEgg[i].y==0) head.push(i)
    }
    for(var i=0;i<head.length;i++){
        statusEgg[head[i]]=2
        console.log(statusEgg[head[i]]);
        updateStatus(arrEgg[head[i]])
    }
    console.log(statusEgg);
    
    for(var i=0;i<n;i++){
        switch (statusEgg[i]) {
            case 0:
                arrEgg[i].c=6
                break;
            case 1:
                arrEgg[i].c=5
                break;
            default:
                break;
        }
    }
    // var tmp = []

}
function isCollide(e1,e2){
if(Math.abs(e1.x-e2.x)==0&&Math.abs(e1.y-e2.y)==0) return false
if(Math.abs(e1.x-e2.x)<=32&&Math.abs(e1.y-e2.y)<=32) return true;
return false;
}
function isFinishGame(){
    for(var i=0;i<n;i++){
        if(arrEgg[i].c<5&&arrEgg[i].y>=224) {return true}
    }
    return false;
}
function show() {
    document.querySelector(".container").innerHTML=""
    for (var i = 0; i < n; i++) {
        var div = document.createElement("div");
        div.classList.add("egg");

        switch (arrEgg[i].c) {
            case 1:
                div.classList.add("red");
                break;
            case 2:
                div.classList.add("blue");
                break;
            case 3:
                div.classList.add("green");
                break;
            case 4:
                div.classList.add("yellow");
                break;
            case 5:
                div.classList.add("destroy");
                break;
            case 6:
                div.classList.add("fall");
                break;
        }

        div.style.position = "absolute";
        div.style.top = arrEgg[i].y + "px";
        div.style.left = arrEgg[i].x + "px";

        document.querySelector(".container").appendChild(div);
    }
}
