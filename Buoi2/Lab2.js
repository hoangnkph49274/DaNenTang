// Lab2

// Bài 1:
console.log("Bài 1: \n");

const class1 = [ {
    mssv: 'PS0000',
    name: 'Nguyen Van A',
    avgPoint: 8.9,
    avgTraningPoint: 7,
    status: 'pass',
    }, {
    mssv: 'PS0001',
    name: 'Nguyen Van B',
    avgPoint: 4.9,
    avgTraningPoint: 10,
    status: 'pass',
    }
];
const class2 = [ {
    mssv: 'PS0002',
    name: 'Nguyen Van C',
    avgPoint: 4.9,
    avgTraningPoint: 10,
    status: 'failed',
    }, {
    mssv: 'PS0003',
    name: 'Nguyen Van D',
    avgPoint: 10,
    avgTraningPoint: 10,
    status: 'pass',
    },
    {
    mssv: 'PS0004',
    name: 'Nguyen Van E',
    avgPoint: 10,
    avgTraningPoint: 2,
    status: 'pass',
    },
]

const allStudent = class1.concat(class2).filter(student => student?.status !== 'failed')

const pointStudent = allStudent.sort((a,b) => b.avgPoint - a.avgPoint);

console.log("Danh sách sinh viên có điểm số từ cao xuống thấp: \n",pointStudent);

allStudent.sort((a,b) => b.avgTraningPoint-a.avgTraningPoint)

console.log("Danh sách sinh viên có điểm rèn luyện từ cao xuống thấp: \n",allStudent);

console.log("Ong vàng là: \n",allStudent[0]);
console.log('\n');


// Bài 2: 

console.log("Bài 2: \n");

const array = [
    {code: "ab", name: "Son môi"},
    {code: "ac", name: "Sữa rửa mặt"},
    {code: null, name: null},
    {code: null, name: ""}
]

const parseArrayToObject = ({ array = [], key = '' }) =>
    Object.fromEntries(
      array
        .filter(item => item?.[key]) 
        .map(item => [item[key], item]) 
    );
  
const filterObject = obj => {
    Object.keys(obj).forEach(key => {
      const item = obj[key];
      if (!item || !item.code || !item.name) {
        delete obj[key];
      }
    });
    return obj;
  };

let productObject = parseArrayToObject({ array, key: 'code' });

productObject = filterObject(productObject);

console.log("Dữ liệu đã được xử lý:", productObject);
console.log('\n');

// Bài 3:

console.log("Bài 3:");

const promise1 = () => new Promise((resolve) => 
    setTimeout(() => 
        resolve("Promise 1 hoàn thành"), 
1000));
const promise2 = () => new Promise((resolve, reject) => 
    setTimeout(() => 
        reject("Promise 2 thất bại"), 
2000));
const promise3 = async () => 
    await fetch('https://64d8a86c5f9bf5b879ce6dd9.mockapi.io/api/v1/moviesNow');

function handlePromiseAll() {
  Promise.all([promise1(), promise2(), promise3()])
    .then((results) => {
      console.log("Yêu cầu 1: Tất cả promise hoàn thành \n", results);
    })
    .catch((error) => {
      console.error("Yêu cầu 1: Một promise thất bại:", error);
    });
}


function handlePromiseAllSettled() {
  Promise.allSettled([promise1(), promise2(), promise3()])
    .then((results) => {
      console.log("Yêu cầu 2: Kết quả tất cả promise:");
      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          console.log(`Promise ${index + 1} hoàn thành:`, result.value);
        } else {
          console.error(`Promise ${index + 1} thất bại:`, result.reason);
        }
      });
    })
    .finally(() => {
      console.log("Yêu cầu 2: Chương trình đã chạy xong.");
    });
}


handlePromiseAll();
handlePromiseAllSettled();