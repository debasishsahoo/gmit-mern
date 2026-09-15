const fruits = ["apple","banana","cherry"];

// Access by index (0-based)
console.log(fruits[0]);// "apple"
console.log(fruits[1]);// "banana"
console.log(fruits[2]);// "cherry"
console.log(fruits[3]);// undefined (index out of bounds)

// Last element
console.log(fruits[fruits.length - 1]);
console.log(fruits.at(-1))

// Modify an element
fruits[1]= "blueberry";
console.log(fruits);

// Length
console.log(fruits.length);// 3
