const numbers = [1,2,3,4,5,6,7,8,9,10];

const evens = numbers.filter(num => num% 2 === 0);
console.log(evens);// [2, 4, 6, 8, 10]

const greaterThanFive = numbers.filter(num => num> 5);
console.log(greaterThanFive);// [6, 7, 8, 9, 10]

const products = [
    { name:"Laptop", price:1200, inStock:true },
    { name:"Phone", price:800, inStock:false },
    { name:"Tablet", price:500, inStock:true },
    { name:"Monitor", price:300, inStock:true }
];


const available = products.filter
(product => product.inStock);
console.log(available);
const affordable = products.filter
(product => product.price< 700 && product.inStock);
console.log(affordable);