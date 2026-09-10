const http = require('http');
const url = require('url');

const users = [
    { id:1, name:'Alice', email:'alice@example.com' },
    { id:2, name:'Bob', email:'bob@example.com' },
    { id:3, name:'Charlie', email:'charlie@example.com' }
];

const server = http.createServer((req,res)=> {});