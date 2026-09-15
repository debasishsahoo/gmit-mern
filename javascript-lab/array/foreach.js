const fruits = ["apple","banana","cherry"];

fruits.forEach(function(fruit,index) {
    console.log(`${index}: ${fruit}`);
});

// Arrow function
fruits.forEach((fruit,index)=> {
    console.log(`${index + 1}. ${fruit}`);
});

const result = fruits.forEach(fruit => fruit.toUpperCase());
console.log(result);