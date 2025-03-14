const fs = require('fs')

// fs.writeFileSync('sample.txt', 'hello from node.js')

// const hobbies = ['Sports', 'Cooking']
// hobbies.map((hobby)=>{
//     return hobby = 'Hobby '+hobby
// })
// console.log(hobbies);
// console.log(hobbies.map(hobby=>'hobby : '+hobby));




// ------------------------------ spread operator and rest operator
// const arrFunc = (...args)=>{             // rest operator
//     return args
// }
// console.log(arrFunc(1,2,3,4,5,6,7,8));

// const obj = {
//     name:'vetri',
//     age:25
// }
// obj.age = 26
// console.log(obj);


// -------------------- Destructuring
// const person = {name:'Brindha', age:27, city:'coimbatore'}
// // const {name} = person
// const{name,age,city} = person
// console.log('Name : ', name, ' and from : ',city);

// const fruitArr = ['apple','orange','papaya','cherry']
// const [fruit1,fruit2,fruit3,fruit4] = fruitArr
// console.log('Fruits : ', fruit1, fruit2);



// ------------- asynchronous code
// const fetchData = (callback) => {
//     setTimeout(() => {
//         callback("call back function from fetch data function")
//     }, 1500);
// }

// setTimeout(() => {
//     fetchData((value) => {
//         console.log(value, ' : value');
//     })
//     console.log('2000 mille seconds passed.');
// }, 2000);
// console.log("Hello");




// ----------------------------- Promise

const myPromise = new Promise((myResolve, myReject)=>{
    myResolve("Hello world program")
})

myPromise.then((text)=>{
    console.log(text, " Success");
}).catch(()=>{
    console.log("Failed");
})
