
const a = 10;
const b = 3;

console.log(a+ b);// 13  (Addition)
console.log(a- b);// 7   (Subtraction)
console.log(a* b);// 30  (Multiplication)
console.log(a/ b);// 3.3333333333333335 (Division)
console.log(a% b);// 1   (Modulus — remainder of division)
console.log(a** b);// 1000 (Exponentiation — 10 to the power of 3)

// Increment and Decrement
let count= 5;
count++;// count is now 6
console.log(count);// 6

count--;// count is now 5
console.log(count);// 5

// Pre-increment vs Post-increment
let x= 5;
console.log(x++);// 5 (returns the value, then increments)
console.log(x);// 6

let y= 5;
console.log(++y);// 6 (increments first, then returns the value)

console.log("Hello" + " " + "World");// "Hello World"
console.log("Age: " + 25);// "Age: 25" (number is converted to string)
console.log(5 + "3");// "53" (number is converted to string)
console.log(5 - "3");// 2 (string is converted to number for subtraction)


