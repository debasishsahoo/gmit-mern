const coordinates = [40.7128,-74.0060];

const [latitude,longitude]= coordinates;
console.log(latitude);
console.log(longitude);

// Skipping elements
const colors = ["red","green","blue","yellow"];
const [first, ,third]= colors;
console.log(first);
console.log(third);

// Rest operator
const [head,...tail]= [1,2,3,4,5,6,7,8,90,];
console.log(head);// 1
console.log(tail);// [2, 3, 4, 5]

// Default values
const [a = 10,b = 20,c = 30]= [1,2];
console.log(a);// 1
console.log(b);// 2
console.log(c);// 30 (default used)