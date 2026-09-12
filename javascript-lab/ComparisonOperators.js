
const a = 10;
const b = 20;

console.log(a> b);  // false
console.log(a< b);// true   (Less than)
console.log(a>= 10);// true   (Greater than or equal to)
console.log(a<= 9);// false  (Less than or equal to)

// Equality
console.log(a== b);// false  (Equal to — loose equality)
console.log(a!= b);// true   (Not equal to — loose)
console.log(a=== b);// false  (Strict equal — checks value AND type)
console.log(a!== b);// true   (Strict not equal)





// Loose equality (==) performs type coercion
console.log(5 == "5");// true (string "5" is converted to number 5)
console.log(0 == false);// true (false is converted to 0)
console.log(null == undefined);// true
console.log("" == false);// true

// Strict equality (===) does NOT perform type coercion
console.log(5 === "5");// false (number vs string — different types)
console.log(0 === false);// false (number vs boolean)
console.log(null === undefined);// false
console.log("" === false);// false