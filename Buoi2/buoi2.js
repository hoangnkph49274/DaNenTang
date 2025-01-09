console.log("Buoi 2 - On tap JS co ban");

let a =1
var b =2

console.log(`Thuong 2 so ${a} va ${b} = ${a/b}`)

function tich2So(a,b){
    return a*b
}
console.log(`Tich 2 so ${a} va ${b} = ${tich2So(a,b)}`)

const players = [
    { name: 'Messi', goals: 30 },
    undefined,
    { name: 'Ronaldo', goals: 28 },
    { name: 'Neymar', goals: 22 },
    { goals: 2 },
    { name: 'Mbappé', goals: 25 },
    { name: 'Pele', goals: null },
];

let valiPlayer = ({name,goals} = {}) => {
    let check = !!name && !!goals
    return check
}

for(player in players){
    if(valiPlayer(player.name,player.goals)){
        console.log(player.name + "-" + player.goals + "\n")
    }
}

const list = players.filter(valiPlayer)
function display(){
    for(let i =0;i<list.length;i++){
        console.log(list[i].name + "-" + list[i].goals)
    }
}
display()