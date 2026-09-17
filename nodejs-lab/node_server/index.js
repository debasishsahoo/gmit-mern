// server.js

const http = require("http");

// Create a server
// The callback function runs every time someone makes a request to this server
const server = http.createServer((request,response)=> {
    // request contains information about the incoming request
    // response is used to send data back to the client

    console.log(`${request.method} ${request.url}`);

    // Set the response status code and headers
    response.writeHead(200, {
        "Content-Type":"text/html"
    });

    // Handle different routes
    if (request.url=== "/") {
        response.end("<h1>Home Page</h1><p>Welcome to the server.</p>");
    }else if (request.url=== "/about") {
        response.end("<h1>About Page</h1><p>This is a Node.js server.</p>");
    }else if (request.url=== "/api/data") {
        response.writeHead(200, {"Content-Type":"application/json" });
        const data = {
            message:"Hello from the API",
            timestamp:new Date().toISOString(),
            status:"ok"
        };
        response.end(JSON.stringify(data));
    }else {
        response.writeHead(404, {"Content-Type":"text/html" });
        response.end("<h1>404 Not Found</h1>");
    }
});

// Start listening on port 3000
const PORT = 3000;
server.listen(PORT, ()=> {
    console.log(`Server is running at http://localhost:${PORT}`);
});