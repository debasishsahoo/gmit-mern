//push

const fruits = ["apple","banana"];

fruits.push("cherry");
console.log(fruits);// ["apple", "banana", "cherry"]

fruits.push("date","elderberry");
console.log(fruits);// ["apple", "banana", "cherry", "date", "elderberry"]

const newLength = fruits.push("fig");
console.log(newLength);// 6