
const person = {
    firstName:"Alice",
    lastName:"Johnson",
    age:20,
    getFullName:function() {
return `${this.firstName} ${this.lastName}`;
    },
    greet() {
return `Hello, my name is ${this.getFullName()} 
and I am ${this.age} years old.`;
    }
};

console.log(person.getFullName());// "Alice Johnson"
console.log(person.greet());// "Hello, my name is Alice Johnson and I am 20 years old."