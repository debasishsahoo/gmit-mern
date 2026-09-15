const numbers = [1,2,3,4,5];

const doubled = numbers.map(function(num) {
    return num* 2;
});
console.log(doubled);// [2, 4, 6, 8, 10]
console.log(numbers);


// Arrow function shorthand
const squared = numbers.map(num => num** 2);
console.log(squared);// [1, 4, 9, 16, 25]

// Extracting properties from objects
const users = [
    { name:"Alice", age:20 },
    { name:"Bob", age:25 },
    { name:"Charlie", age:30 }
];

const names = users.map(user => user.name);
console.log(names);// ["Alice", "Bob", "Charlie"]

// Transforming data
const prices = [10,20,30];
const withTax = prices.map(price => ({
    original: price,
    withTax: price* 1.1
}));
console.log(withTax);  