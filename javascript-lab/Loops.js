
// Print numbers 1 to 5
for (let i= 1; i<= 5; i++) {
    console.log(i);
}
// Output: 1, 2, 3, 4, 5

// Print even numbers from 0 to 10
for (let i= 0; i<= 10; i+= 2) {
    console.log(i);
}
// Output: 0, 2, 4, 6, 8, 10

// Countdown
for (let i= 10; i>= 0; i--) {
    console.log(i);
}

// Iterating over an array by index
const fruits1 = ["apple","banana","cherry"];
for (let i= 0; i< fruits1.length; i++) {
    console.log(`${i}: ${fruits1[i]}`);
}
// Output:
// 0: apple
// 1: banana
// 2: cherry



let count= 1;
while (count<= 5) {
    console.log(count);
    count++;
}
// Output: 1, 2, 3, 4, 5

// Finding the first power of 2 greater than 1000
let power= 1;
while (power<= 1000) {
    power*= 2;
}
console.log(power);// 1024



let num= 1;
do {
    console.log(num);
    num++;
}while (num<= 5);
// Output: 1, 2, 3, 4, 5

// Even if the condition is initially false, the body runs once
let x= 100;
do {
    console.log("This runs once: " + x);
    x++;
}while (x< 5);
// Output: This runs once: 100


const colors = ["red","green","blue"];

for (const color of colors) {
    console.log(color);
}
// Output:
// red
// green
// blue

// Iterating over a string
const word = "Hello";
for (const char of word) {
    console.log(char);
}
// Output: H, e, l, l, o

// Using with entries() to get both index and value
const fruits2 = ["apple","banana","cherry"];
for (const [index,fruit]of fruits2.entries()) {
    console.log(`${index}: ${fruit}`);
}
// Output:
// 0: apple
// 1: banana
// 2: cherry


const student = {
    name:"Alice",
    age:20,
    course:"MERN"
};

for (const key in student) {
    console.log(`${key}: ${student[key]}`);
}
// Output:
// name: Alice
// age: 20
// course: MERN



// Avoid this:
const arr = ["a","b","c"];
for (const index in arr) {
    console.log(typeof index);// "string" — indices are strings, not numbers
    console.log(arr[index]);
}

// Prefer this:
for (const value of arr) {
    console.log(value);
}


// break — exits the loop entirely
for (let i= 1; i<= 10; i++) {
    if (i=== 5) {
        break;
    }
    console.log(i);
}
// Output: 1, 2, 3, 4

// continue — skips the current iteration and moves to the next one
for (let i= 1; i<= 10; i++) {
    if (i% 3 === 0) {
        continue;// Skip multiples of 3
    }
    console.log(i);
}
// Output: 1, 2, 4, 5, 7, 8, 10


// Multiplication table
for (let i= 1; i<= 3; i++) {
    for (let j= 1; j<= 3; j++) {
        console.log(`${i} x ${j} = ${i * j}`);
    }
}
// Output:
// 1 x 1 = 1
// 1 x 2 = 2
// 1 x 3 = 3
// 2 x 1 = 2
// 2 x 2 = 4
// ... and so on


