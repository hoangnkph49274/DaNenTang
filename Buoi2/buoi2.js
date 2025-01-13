// console.log("Buoi 2 - On tap JS co ban");

// let a =1
// var b =2

// console.log(`Thuong 2 so ${a} va ${b} = ${a/b}`)

// function tich2So(a,b){
//     return a*b
// }
// console.log(`Tich 2 so ${a} va ${b} = ${tich2So(a,b)}`)

// const players = [
//     { name: 'Messi', goals: 30 },
//     undefined,
//     { name: 'Ronaldo', goals: 28 },
//     { name: 'Neymar', goals: 22 },
//     { goals: 2 },
//     { name: 'Mbappé', goals: 25 },
//     { name: 'Pele', goals: null },
// ];

// let valiPlayer = ({name,goals} = {}) => {
//     let check = !!name && !!goals
//     return check
// }

// for(player in players){
//     if(valiPlayer(player.name,player.goals)){
//         console.log(player.name + "-" + player.goals + "\n")
//     }
// }

// const list = players.filter(valiPlayer)
// function display(){
//     for(let i =0;i<list.length;i++){
//         console.log(list[i].name + "-" + list[i].goals)
//     }
// }
// display()

console.log("BTVN Buổi 2\n");

function testNum(a){
    let result;
    if(a>0){
        result=`${a} là số dương`
    } else{
        result=`${a} là số dương`
    }
    return result
}
console.log(testNum(-5))
console.log(testNum(3)+"\n")

function getFee(isMember){
    return isMember ? '2.00' : '10.00'
}

console.log("Phí thành viên là: ",getFee(true));

console.log("Phí thành viên là: ",getFee(false));

console.log("Phí thành viên là: "+getFee(null)+"\n");

const expr = 'Cam';
switch (expr) {
    case 'Tao':
        console.log('Oranges are $0.59 a pound. '+"\n");
        break;
    case 'Cam':
    case 'Buoi':
        console.log('Cam và bưởi giá 20,000/kg.'+"\n");
        break;
    default:
        console.log(`Xin lỗi, Chúng tôi không có giá của ${expr}`+"\n")
}

for(let step = 0;step<5;step++){
    console.log('Đi bộ mỗi bước về phía đông, bước thứ ',step+1);
}
console.log("\n");

let condition = 0;
do{
    console.log("Làm gì đó ở đây");
    condition++;
}while(condition<3);

console.log("\n");

const dumoProps = (obj,objName) =>{
    let result = "";
    for(const i in obj){
        result += `${objName}.${i} = ${obj[i]}\n`
    }
    console.log(result)
}

const myCar = {make:"Fook",model:"Mustang"}
dumoProps(myCar,"car")

console.log("\n");

const arr = [1,2,3,4,5]
console.log("Độ dài của mảng là: ",arr.length);
console.log("\n");
const array1 = ['a','b','c'];
const array2 = ['d','e','f'];
const array3 = array1.concat(array2);

console.log("Mảng array3: ",array3);
console.log("\n");
const words = ['spray','limit','elite','exuberant','destruction','present'];

const result = words.filter((word) => word.length>6);

console.log(result);
console.log("\n");
const array4 = [5,12,8,130,44]

const found = array4.find((element) => element>10);
const found2 = array4.find((element) => element>100000000);

console.log(found);

console.log(found2);

console.log("\n");

const map = array4.map((x) => x*2)

console.log(map);

map.forEach((element) => console.log(element));


console.log("\n");

const userList = null 
userList?.map?.(user => console.log("Làm gì đó ở đây"));


const obj1 = {a:'Sometring',b: 42,c: false}

for(const [key,value] of Object.entries(obj1)){
    console.log(`${key}: ${value}`);
}

console.log(Object.keys(obj1));

console.log(Object.values(obj1))
