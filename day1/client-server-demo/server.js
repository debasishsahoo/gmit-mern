// server.js
// A simple HTTP server built with Node.js core modules
// No external dependencies required

const http = require('http');
const url = require('url');

// In-memory data store (simulates a database)
const users = [
    { id:1, name:'Alice', email:'alice@example.com' },
    { id:2, name:'Bob', email:'bob@example.com' },
    { id:3, name:'Charlie', email:'charlie@example.com' }
];

// Create the HTTP server
const server = http.createServer((req,res)=> {
    // Parse the incoming URL
    const parsedUrl = url.parse(req.url,true);
    const path = parsedUrl.pathname;
    const method = req.method;

    // Log every request (server-side processing)
    console.log(`[${new Date().toISOString()}] ${method} ${path}`);

    // Set CORS headers so browser can make requests
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type'
    );

    // Handle preflight requests
    if (method=== 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // ROUTE: Serve the frontend HTML page
    if (path=== '/' && method=== 'GET') {
        res.writeHead(200, {'Content-Type':'text/html' });
        res.end(getHomePage());
        return;
    }

    // ROUTE: GET /api/users — Return all users
    if (path=== '/api/users' && method=== 'GET') {
        // Server-side processing: query data store
        res.writeHead(200, {'Content-Type':'application/json' });
        res.end(JSON.stringify({
            success:true,
            message:'Users retrieved successfully',
            data: users,
            processedOn:'SERVER',
            timestamp:new Date().toISOString()
        }));
        return;
    }

    // ROUTE: POST /api/users — Create a new user
    if (path=== '/api/users' && method=== 'POST') {
        let body= '';

        // Collect the request body data
        req.on('data',chunk => {
            body+= chunk.toString();
        });

        req.on('end', ()=> {
            try {
                const newUser = JSON.parse(body);

                // Server-side validation
                if (!newUser.name|| !newUser.email) {
                    res.writeHead(400, {
                        'Content-Type':'application/json'
                    });
                    res.end(JSON.stringify({
                        success:false,
                        message:'Name and email are required'
                    }));
                    return;
                }

                // Server-side processing: add to data store
                const user = {
                    id: users.length + 1,
                    name: newUser.name,
                    email: newUser.email
                };
                users.push(user);

                console.log(`New user created: ${user.name}`);

                res.writeHead(201, {
                    'Content-Type':'application/json'
                });
                res.end(JSON.stringify({
                    success:true,
                    message:'User created successfully',
                    data: user,
                    processedOn:'SERVER'
                }));
            }catch (error) {
                res.writeHead(400, {
                    'Content-Type':'application/json'
                });
                res.end(JSON.stringify({
                    success:false,
                    message:'Invalid JSON in request body'
                }));
            }
        });
        return;
    }

    // ROUTE: GET /api/server-info — Server information
    if (path=== '/api/server-info' && method=== 'GET') {
        res.writeHead(200, {
            'Content-Type':'application/json'
        });
        res.end(JSON.stringify({
            server:'Node.js HTTP Server',
            nodeVersion: process.version,
            platform: process.platform,
            uptime:`${Math.floor(process.uptime())} seconds`,
            memoryUsage: process.memoryUsage(),
            processedOn:'SERVER'
        }));
        return;
    }

    // 404 — Route not found
    res.writeHead(404, {'Content-Type':'application/json' });
    res.end(JSON.stringify({
        success:false,
        message:`Route ${method} ${path} not found`
    }));
});

// Start listening on port 3000
const PORT = 3000;
server.listen(PORT, ()=> {
    console.log('='.repeat(50));
    console.log(`SERVER is running at http://localhost:${PORT}`);
    console.log(`Open your browser (CLIENT) and visit the URL above`);
    console.log('='.repeat(50));
});

// HTML page served by the server
function getHomePage() {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, initial-scale=1.0">
        <title>Client-Server Demo</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: 'Segoe UI', sans-serif;
                background: #0f0f23;
                color: #ccc;
                padding: 30px;
            }
            .container { max-width: 900px; margin: 0 auto; }
            h1 { color: #00d4ff; margin-bottom: 5px; }
            .subtitle { color: #666; margin-bottom: 30px; }
            .panel {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                margin-bottom: 20px;
            }
            .box {
                background: #1a1a2e;
                border: 1px solid #333;
                border-radius: 8px;
                padding: 20px;
            }
            .box h2 {
                font-size: 1.1em;
                margin-bottom: 15px;
                padding-bottom: 10px;
                border-bottom: 1px solid #333;
            }
            .client-box h2 { color: #00ff88; }
            .server-box h2 { color: #ff6b6b; }
            button {
                background: #00d4ff;
                color: #0f0f23;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
                margin: 5px;
                transition: 0.3s;
            }
            button:hover { background: #00ff88; }
            input {
                background: #0f0f23;
                border: 1px solid #333;
                color: #eee;
                padding: 8px 12px;
                border-radius: 4px;
                width: 100%;
                margin: 5px 0;
            }
            input:focus {
                outline: none;
                border-color: #00d4ff;
            }
            .output {
                background: #0a0a15;
                border: 1px solid #222;
                border-radius: 4px;
                padding: 15px;
                margin-top: 15px;
                font-family: 'Courier New', monospace;
                font-size: 0.85em;
                white-space: pre-wrap;
                max-height: 300px;
                overflow-y: auto;
            }
            .badge {
                display: inline-block;
                padding: 2px 8px;
                border-radius: 3px;
                font-size: 0.75em;
                font-weight: bold;
            }
            .badge-client {
                background: #00ff88;
                color: #000;
            }
            .badge-server {
                background: #ff6b6b;
                color: #000;
            }
            .log-entry { margin: 3px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Client-Server Architecture Demo</h1>
            <p class="subtitle">
                See the request-response cycle in action
            </p>

            <div class="panel">
                <div class="box client-box">
                    <h2>CLIENT (Browser)</h2>
                    <p>This code runs in YOUR browser:</p>
                    <br>
                    <button onclick="fetchUsers()">
                        GET /api/users
                    </button>
                    <button onclick="fetchServerInfo()">
                        GET /api/server-info
                    </button>
                    <br><br>

                    <h3 style="color: #00d4ff; font-size: 0.9em;">
                        Add New User (POST)
                    </h3>
                    <input type="text"
                           id="userName"
                           placeholder="Name">
                    <input type="email"
                           id="userEmail"
                           placeholder="Email">
                    <button onclick="createUser()">
                        POST /api/users
                    </button>

                    <br><br>
                    <h3 style="color: #00d4ff; font-size: 0.9em;">
                        Client-Side Validation
                    </h3>
                    <button onclick="clientSideDemo()">
                        Run Client-Side Code
                    </button>
                </div>

                <div class="box server-box">
                    <h2>SERVER (Node.js)</h2>
                    <p>Check your terminal for server-side logs</p>
                    <br>
                    <p>Server processes:</p>
                    <ul style="padding-left: 20px; margin-top: 10px;">
                        <li>Receives HTTP requests</li>
                        <li>Routes to correct handler</li>
                        <li>Queries data store</li>
                        <li>Validates input</li>
                        <li>Sends HTTP response</li>
                    </ul>
                </div>
            </div>

            <div class="box">
                <h2 style="color: #ffd700;">
                    Activity Log
                </h2>
                <div class="output" id="logOutput">
Waiting for actions...
                </div>
            </div>

            <div class="box">
                <h2 style="color: #ffd700;">
                    Response Data
                </h2>
                <div class="output" id="responseOutput">
Waiting for server response...
                </div>
            </div>
        </div>

        <script>
            // All this code runs on the CLIENT (browser)
            const logOutput
                = document.getElementById('logOutput');
            const responseOutput
                = document.getElementById('responseOutput');

            function addLog(message, side) {
                const badge = side === 'client'
                    ? '<span class="badge badge-client">'
                      + 'CLIENT</span>'
                    : '<span class="badge badge-server">'
                      + 'SERVER</span>';
                logOutput.innerHTML += '\\n'
                    + badge + ' ' + message;
                logOutput.scrollTop = logOutput.scrollHeight;
            }

            // CLIENT-SIDE: Make GET request for users
            async function fetchUsers() {
                addLog('Sending GET request to /api/users...',
                       'client');

                try {
                    const response
                        = await fetch('/api/users');
                    const data = await response.json();

                    addLog(
                        'Response received: '
                        + response.status + ' '
                        + response.statusText,
                        'server'
                    );

                    responseOutput.textContent
                        = JSON.stringify(data, null, 2);
                } catch (error) {
                    addLog('Error: ' + error.message,
                           'client');
                }
            }

            // CLIENT-SIDE: Make GET request for server info
            async function fetchServerInfo() {
                addLog(
                    'Sending GET request to /api/server-info...',
                    'client'
                );

                try {
                    const response
                        = await fetch('/api/server-info');
                    const data = await response.json();

                    addLog(
                        'Server info received',
                        'server'
                    );

                    responseOutput.textContent
                        = JSON.stringify(data, null, 2);
                } catch (error) {
                    addLog('Error: ' + error.message,
                           'client');
                }
            }

            // CLIENT-SIDE: Make POST request to create user
            async function createUser() {
                const name
                    = document.getElementById('userName').value;
                const email
                    = document.getElementById('userEmail').value;

                // Client-side validation (runs in browser)
                if (!name || !email) {
                    addLog(
                        'CLIENT-SIDE VALIDATION: '
                        + 'Name and email required!',
                        'client'
                    );
                    return;
                }

                addLog(
                    'Sending POST request with data: '
                    + JSON.stringify({ name, email }),
                    'client'
                );

                try {
                    const response = await fetch('/api/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ name, email })
                    });
                    const data = await response.json();

                    addLog(
                        'Response: ' + response.status
                        + ' - ' + data.message,
                        'server'
                    );

                    responseOutput.textContent
                        = JSON.stringify(data, null, 2);

                    // Clear inputs
                    document.getElementById('userName').value
                        = '';
                    document.getElementById('userEmail').value
                        = '';
                } catch (error) {
                    addLog('Error: ' + error.message,
                           'client');
                }
            }

            // Pure CLIENT-SIDE processing demo
            function clientSideDemo() {
                addLog(
                    'Running code entirely in the browser...',
                    'client'
                );

                const now = new Date();
                const browserInfo = {
                    processedOn: 'CLIENT (Browser)',
                    userAgent: navigator.userAgent,
                    language: navigator.language,
                    screenSize: window.innerWidth
                                + 'x'
                                + window.innerHeight,
                    currentTime: now.toISOString(),
                    note: 'This data was generated WITHOUT '
                          + 'contacting the server!'
                };

                addLog(
                    'No server request made! '
                    + 'All processed locally.',
                    'client'
                );

                responseOutput.textContent
                    = JSON.stringify(browserInfo, null, 2);
            }
        </script>
    </body>
    </html>
    `;
}