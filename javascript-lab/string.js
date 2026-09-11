const singleQuotes = 'Hello World';
const doubleQuotes = "Hello World";
const backticks = `Hello World`;

const name = "Alice";
const age = 20;

//String concatenation (older approach)
const message1 = "My name is " + name+ 
" and I am " + age+ " years old.";

// Template literal (modern approach)
const message2 = `My name is ${name} and 
I am ${age} years old.`;

const multiLine = `This is line one.
This is line two.
This is line three.`;

console.log(message1);
console.log(message2);

const text = "Hello World";
console.log(text.length);
console.log(text.toUpperCase());
console.log(text.toLowerCase());
console.log(text.indexOf("World"));
console.log(text.includes("Hello"));
console.log(text.slice(0,5));
console.log(text.split(" "));
console.log(text.trim());
console.log(text.replace("World","JavaScript"));