
// Object literal
const student = {
    name:"Alice",
    age:20,
    course:"MERN",
    "favorite color":"red"
};

// Empty object
const empty = {};

// Dot notation
console.log(student.name);
console.log(student.age);
console.log(student.course);
console.log(student["favorite color"]);
const property = "course";
// Bracket notation with variables
console.log(student[property]);
// Accessing non-existent property
console.log(student.email);