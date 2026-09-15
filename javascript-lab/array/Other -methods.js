
const arr = [3,1,4,1,5,9,2,6];

// sort — sorts in place (modifies the original array)
const sorted = [...arr].sort((a,b)=> a- b);// ascending
console.log(sorted);// [1, 1, 2, 3, 4, 5, 6, 9]

// reverse — reverses in place
const reversed = [...arr].reverse();
console.log(reversed);

// slice — returns a portion of the array (does not modify original)
console.log(arr.slice(2,5));// [4, 1, 5]
console.log(arr.slice(-3));// [2, 6] — wait, let me recalculate: arr = [3,1,4,1,5,9,2,6], slice(-3) = [9, 2, 6]

// splice — adds/removes elements in place (modifies original)
const colors = ["red","green","blue","yellow"];
colors.splice(1,2);// Remove 2 elements starting at index 1
console.log(colors);// ["red", "yellow"]

const letters = ["a","b","e","f"];
letters.splice(2,0,"c","d");// Insert "c" and "d" at index 2
console.log(letters);// ["a", "b", "c", "d", "e", "f"]

// indexOf — finds the index of the first occurrence
const nums = [10,20,30,20,10];
console.log(nums.indexOf(20));// 1
console.log(nums.indexOf(50));// -1 (not found)

// join — converts array to string
console.log(["Hello","World"].join(" "));// "Hello World"
console.log([2024,1,15].join("-"));// "2024-1-15"

// concat — merges arrays (returns new array)
const a = [1,2];
const b = [3,4];
const c = a.concat(b);
console.log(c);// [1, 2, 3, 4]

// Spread operator (modern alternative to concat)
const d = [...a,...b];
console.log(d);// [1, 2, 3, 4]

// flat — flattens nested arrays
const nested = [[1,2], [3,4], [5, [6,7]]];
console.log(nested.flat());// [1, 2, 3, 4, 5, [6, 7]]
console.log(nested.flat(2));// [1, 2, 3, 4, 5, 6, 7]

// every — checks if ALL elements pass a test
const ages = [22,25,30,18];
console.log(ages.every(age => age>= 18));// true
console.log(ages.every(age => age>= 21));// false

// some — checks if AT LEAST ONE element passes a test
console.log(ages.some(age => age>= 30));// true
console.log(ages.some(age => age>= 50));// false

// findIndex — returns the index of the first element that passes a test
console.log(ages.findIndex(age => age>= 25));// 1