
const numbers = [1,2,3,4,5];

// Sum of all numbers
const sum = numbers.reduce(

    function(accumulator,currentValue) {
    return accumulator+ currentValue;
},

0);
console.log(sum);// 15

// How it works step by step:
// Step 1: accumulator = 0,  currentValue = 1, return 0 + 1 = 1
// Step 2: accumulator = 1,  currentValue = 2, return 1 + 2 = 3
// Step 3: accumulator = 3,  currentValue = 3, return 3 + 3 = 6
// Step 4: accumulator = 6,  currentValue = 4, return 6 + 4 = 10
// Step 5: accumulator = 10, currentValue = 5, return 10 + 5 = 15

// Arrow function shorthand
const product = numbers.reduce((acc,num)=> acc* num,1);
console.log(product);// 120

// Finding the maximum value
const max = numbers.reduce((acc,num)=>
    (num> acc? num: acc), numbers[0]);
console.log(max);// 5

// Counting occurrences
const fruits = ["apple","banana","apple",
    "cherry","banana","apple"];
const fruitCount = fruits.reduce((acc,fruit)=> {
    acc[fruit]= (acc[fruit]|| 0)+ 1;
    return acc;
}, {});
console.log(fruitCount);// { apple: 3, banana: 2, cherry: 1 }

// Calculating total price
const cart = [
    { name:"Laptop", price:1200, quantity:1 },
    { name:"Mouse", price:25, quantity:2 },
    { name:"Keyboard", price:75, quantity:1 }
];

const total = cart.reduce((acc,item)=> 
    acc+ item.price* item.quantity,0);
console.log(total);// 1325