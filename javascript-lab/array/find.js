const numbers = [10,20,30,40,50];

const found = numbers.find(function(num) {
    return num> 25;
});
console.log(found);

// With arrow function// =>
const result = numbers.find(num => num> 100);
console.log(result);// undefined (no number greater than 100)

// Finding an object in an array
const users = [
    { id:1, name:"Alice" },
    { id:2, name:"Bob" },
    { id:3, name:"Charlie" }
];

const user = users.find(u => u.id=== 2);
console.log(user);// { id: 2, name: "Bob" }