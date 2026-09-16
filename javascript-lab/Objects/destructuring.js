
const student = {
    name:"Alice",
    age:20,
    course:"MERN",
    gpa:3.8
};
const {name,age,course }= student;
console.log(name);
console.log(age);
console.log(course);

const {name:studentName,age:studentAge }= student;
console.log(studentName);
console.log(studentAge);

const {name:n,email = "not provided" }= student;
console.log(email);