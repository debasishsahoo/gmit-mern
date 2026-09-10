// http-methods-server.js
// Demonstrates ALL HTTP methods and status codes

const http = require('http');

// In-memory database
let products= [
    {
        id:1,
        name:'Laptop',
        price:999.99,
        category:'Electronics'
    },
    {
        id:2,
        name:'Headphones',
        price:79.99,
        category:'Electronics'
    },
    {
        id:3,
        name:'Desk Chair',
        price:299.99,
        category:'Furniture'
    }
];

let nextId= 4;

const server = http.createServer((req,res)=> {
    const method = req.method;
    const urlParts = req.url.split('?');
    const path = urlParts[0];
    const queryString = urlParts[1]|| '';

    // Parse query parameters
    const queryParams = {};
    queryString.split('&').forEach(param => {
        const [key,value]= param.split('=');
        if (key) queryParams[key]= decodeURIComponent(value);
    });

    // Set common headers
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );

    if (method=== 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Log the request
    console.log(`\n${'─'.repeat(50)}`);
    console.log(`${method} ${req.url}`);
    console.log(`Time: ${new Date().toLocaleTimeString()}`);

    // SERVE HTML INTERFACE
    if (path=== '/' && method=== 'GET') {
        res.writeHead(200, {'Content-Type':'text/html' });
        res.end(getHTTPDemoPage());
        return;
    }

    // ============================================
    // API ROUTES
    // ============================================

    // GET /api/products — List all products (200)
    if (path=== '/api/products' && method=== 'GET') {
        console.log('→ Returning all products');

        // Simulate filtering by query parameter
        let filteredProducts= [...products];
        if (queryParams.category) {
            filteredProducts= products.filter(
                p => p.category.toLowerCase()
                     === queryParams.category.toLowerCase()
            );
        }

        sendResponse(res,200, {
            success:true,
            count: filteredProducts.length,
            data: filteredProducts
        });
        return;
    }

    // GET /api/products/:id — Get single product (200 or 404)
    const singleProductMatch = path.match(
        /^\/api\/products\/(\d+)$/
    );
    if (singleProductMatch&& method=== 'GET') {
        const id = parseInt(singleProductMatch[1]);
        const product = products.find(p => p.id=== id);

        if (!product) {
            console.log(`→ Product ${id} NOT FOUND`);
            sendResponse(res,404, {
                success:false,
                message:`Product with id ${id} not found`
            });
            return;
        }

        console.log(`→ Found product: ${product.name}`);
        sendResponse(res,200, {
            success:true,
            data: product
        });
        return;
    }

    // POST /api/products — Create new product (201 or 400)
    if (path=== '/api/products' && method=== 'POST') {
        collectBody(req, (body)=> {
            try {
                const data = JSON.parse(body);

                // Validation — returns 400 if invalid
                const errors = [];
                if (!data.name) errors.push('name is required');
                if (!data.price) errors.push('price is required');
                if (data.price&& typeof data.price!== 'number') {
                    errors.push('price must be a number');
                }

                if (errors.length > 0) {
                    console.log(`→ Validation failed: ${errors}`);
                    sendResponse(res,400, {
                        success:false,
                        message:'Validation failed',
                        errors: errors
                    });
                    return;
                }

                const newProduct = {
                    id: nextId++,
                    name: data.name,
                    price: data.price,
                    category: data.category|| 'Uncategorized'
                };

                products.push(newProduct);
                console.log(`→ Created: ${newProduct.name}`);

                // 201 Created
                sendResponse(res,201, {
                    success:true,
                    message:'Product created successfully',
                    data: newProduct
                });
            }catch (e) {
                sendResponse(res,400, {
                    success:false,
                    message:'Invalid JSON in request body'
                });
            }
        });
        return;
    }

    // PUT /api/products/:id — Replace product (200 or 404)
    const putMatch = path.match(/^\/api\/products\/(\d+)$/);
    if (putMatch&& method=== 'PUT') {
        const id = parseInt(putMatch[1]);

        collectBody(req, (body)=> {
            const index = products.findIndex(p => p.id=== id);

            if (index=== -1) {
                sendResponse(res,404, {
                    success:false,
                    message:`Product with id ${id} not found`
                });
                return;
            }

            try {
                const data = JSON.parse(body);

                // PUT replaces the ENTIRE resource
                products[index]= {
                    id: id,
                    name: data.name|| '',
                    price: data.price|| 0,
                    category: data.category|| 'Uncategorized'
                };

                console.log(
                    `→ Replaced product ${id} entirely`
                );

                sendResponse(res,200, {
                    success:true,
                    message:'Product replaced successfully',
                    data: products[index]
                });
            }catch (e) {
                sendResponse(res,400, {
                    success:false,
                    message:'Invalid JSON'
                });
            }
        });
        return;
    }

    // PATCH /api/products/:id — Partially update (200 or 404)
    const patchMatch = path.match(
        /^\/api\/products\/(\d+)$/
    );
    if (patchMatch&& method=== 'PATCH') {
        const id = parseInt(patchMatch[1]);

        collectBody(req, (body)=> {
            const index = products.findIndex(p => p.id=== id);

            if (index=== -1) {
                sendResponse(res,404, {
                    success:false,
                    message:`Product with id ${id} not found`
                });
                return;
            }

            try {
                const data = JSON.parse(body);

                // PATCH only updates provided fields
                if (data.name!== undefined) {
                    products[index].name= data.name;
                }
                if (data.price!== undefined) {
                    products[index].price= data.price;
                }
                if (data.category!== undefined) {
                    products[index].category= data.category;
                }

                console.log(
                    `→ Partially updated product ${id}`
                );

                sendResponse(res,200, {
                    success:true,
                    message:'Product updated successfully',
                    data: products[index]
                });
            }catch (e) {
                sendResponse(res,400, {
                    success:false,
                    message:'Invalid JSON'
                });
            }
        });
        return;
    }

    // DELETE /api/products/:id — Delete product (204 or 404)
    const deleteMatch = path.match(
        /^\/api\/products\/(\d+)$/
    );
    if (deleteMatch&& method=== 'DELETE') {
        const id = parseInt(deleteMatch[1]);
        const index = products.findIndex(p => p.id=== id);

        if (index=== -1) {
            sendResponse(res,404, {
                success:false,
                message:`Product with id ${id} not found`
            });
            return;
        }

        const deleted = products.splice(index,1)[0];
        console.log(`→ Deleted: ${deleted.name}`);

        // 204 No Content — successful deletion
        res.writeHead(204);
        res.end();
        return;
    }

    // SIMULATE AUTH — 401 and 403
    if (path=== '/api/admin' && method=== 'GET') {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            // 401 Unauthorized — no credentials provided
            sendResponse(res,401, {
                success:false,
                message:'Authentication required. '
                    + 'Please provide a Bearer token.'
            });
            return;
        }

        if (authHeader!== 'Bearer admin-secret-token') {
            // 403 Forbidden — credentials invalid/insufficient
            sendResponse(res,403, {
                success:false,
                message:'Forbidden. You do not have admin access.'
            });
            return;
        }

        sendResponse(res,200, {
            success:true,
            message:'Welcome, Admin!',
            secretData:'The server runs on Node.js!'
        });
        return;
    }

    // SIMULATE SERVER ERROR — 500
    if (path=== '/api/error' && method=== 'GET') {
        console.log('→ Simulating server error');
        sendResponse(res,500, {
            success:false,
            message:'Internal Server Error — '
                + 'something went wrong on the server'
        });
        return;
    }

    // 404 — Route not found
    sendResponse(res,404, {
        success:false,
        message:`Cannot ${method} ${path}`
    });
});

function collectBody(req,callback) {
    let body= '';
    req.on('data',chunk => { body+= chunk.toString(); });
    req.on('end', ()=> callback(body));
}

function sendResponse(res,statusCode,data) {
    const statusTexts = {
        200:'OK',
        201:'Created',
        204:'No Content',
        400:'Bad Request',
        401:'Unauthorized',
        403:'Forbidden',
        404:'Not Found',
        500:'Internal Server Error'
    };

    console.log(`← Response: ${statusCode} ${statusTexts[statusCode]}`);

    res.writeHead(statusCode, {
        'Content-Type':'application/json'
    });
    res.end(JSON.stringify(data,null,2));
}

function getHTTPDemoPage() {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, initial-scale=1.0">
        <title>HTTP Methods & Status Codes</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: 'Courier New', monospace;
                background: #0d1117;
                color: #c9d1d9;
                padding: 20px;
            }
            .container { max-width: 1000px; margin: 0 auto; }
            h1 { color: #58a6ff; margin-bottom: 20px; }
            .grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
            }
            .card {
                background: #161b22;
                border: 1px solid #30363d;
                border-radius: 6px;
                padding: 15px;
            }
            .card h3 {
                margin-bottom: 10px;
                padding-bottom: 8px;
                border-bottom: 1px solid #30363d;
            }
            .method-get { color: #3fb950; }
            .method-post { color: #58a6ff; }
            .method-put { color: #d29922; }
            .method-patch { color: #bc8cff; }
            .method-delete { color: #f85149; }
            button {
                padding: 6px 14px;
                border: 1px solid #30363d;
                border-radius: 4px;
                cursor: pointer;
                margin: 3px;
                font-family: inherit;
                font-size: 0.85em;
                color: #c9d1d9;
                transition: 0.2s;
            }
            button:hover { border-color: #58a6ff; }
            .btn-get { background: #0d2818; border-color: #3fb950; }
            .btn-post { background: #0d1b2e; border-color: #58a6ff; }
            .btn-put { background: #2b1d0e; border-color: #d29922; }
            .btn-patch { background: #1f0d2e; border-color: #bc8cff; }
            .btn-delete { background: #2d0e0e; border-color: #f85149; }
            .btn-error { background: #2d0e0e; border-color: #f85149; }
            input {
                background: #0d1117;
                border: 1px solid #30363d;
                color: #c9d1d9;
                padding: 6px 10px;
                border-radius: 4px;
                width: 100%;
                margin: 3px 0;
                font-family: inherit;
            }
            .output-area {
                background: #0d1117;
                border: 1px solid #30363d;
                border-radius: 6px;
                padding: 15px;
                margin-top: 15px;
                min-height: 200px;
                white-space: pre-wrap;
                font-size: 0.85em;
                overflow-x: auto;
            }
            .status-badge {
                display: inline-block;
                padding: 2px 8px;
                border-radius: 3px;
                font-size: 0.8em;
                font-weight: bold;
                margin-left: 5px;
            }
            .status-2xx { background: #238636; color: #fff; }
            .status-4xx { background: #d29922; color: #000; }
            .status-5xx { background: #f85149; color: #fff; }
            .full-width { grid-column: 1 / -1; }
            label {
                font-size: 0.85em;
                color: #8b949e;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>HTTP Methods & Status Codes</h1>

            <div class="grid">
                <div class="card">
                    <h3 class="method-get">GET — Read</h3>
                    <button class="btn-get"
                            onclick="makeRequest('GET','/api/products')">
                        GET All Products (200)
                    </button>
                    <button class="btn-get"
                            onclick="makeRequest('GET','/api/products/1')">
                        GET Product 1 (200)
                    </button>
                    <button class="btn-get"
                            onclick="makeRequest('GET','/api/products/999')">
                        GET Product 999 (404)
                    </button>
                    <button class="btn-get"
                            onclick="makeRequest('GET','/api/products?category=Electronics')">
                        GET Electronics (200)
                    </button>
                </div>

                <div class="card">
                    <h3 class="method-post">POST — Create</h3>
                    <input id="postName"
                           placeholder="Product name"
                           value="Keyboard">
                    <input id="postPrice"
                           placeholder="Price"
                           type="number"
                           value="49.99">
                    <input id="postCategory"
                           placeholder="Category"
                           value="Electronics">
                    <button class="btn-post"
                            onclick="createProduct()">
                        POST Create Product (201)
                    </button>
                    <button class="btn-post"
                            onclick="createInvalid()">
                        POST Invalid Data (400)
                    </button>
                </div>

                <div class="card">
                    <h3 class="method-put">PUT — Replace</h3>
                    <label>Replace product ID:</label>
                    <input id="putId"
                           value="1"
                           type="number">
                    <input id="putName"
                           placeholder="New name"
                           value="Gaming Laptop">
                    <input id="putPrice"
                           placeholder="New price"
                           type="number"
                           value="1499.99">
                    <button class="btn-put"
                            onclick="replaceProduct()">
                        PUT Replace (200)
                    </button>
                </div>

                <div class="card">
                    <h3 class="method-patch">PATCH — Update</h3>
                    <label>Update product ID:</label>
                    <input id="patchId"
                           value="2"
                           type="number">
                    <input id="patchPrice"
                           placeholder="New price only"
                           type="number"
                           value="59.99">
                    <button class="btn-patch"
                            onclick="updateProduct()">
                        PATCH Update Price (200)
                    </button>
                </div>

                <div class="card">
                    <h3 class="method-delete">DELETE — Remove</h3>
                    <label>Delete product ID:</label>
                    <input id="deleteId"
                           value="3"
                           type="number">
                    <button class="btn-delete"
                            onclick="deleteProduct()">
                        DELETE Product (204)
                    </button>
                </div>

                <div class="card">
                    <h3 style="color: #f85149;">
                        Auth & Error Codes
                    </h3>
                    <button class="btn-error"
                            onclick="makeRequest('GET','/api/admin')">
                        No Auth (401)
                    </button>
                    <button class="btn-error"
                            onclick="makeAuthRequest('wrong-token')">
                        Wrong Token (403)
                    </button>
                    <button class="btn-get"
                            onclick="makeAuthRequest('admin-secret-token')">
                        Correct Token (200)
                    </button>
                    <button class="btn-error"
                            onclick="makeRequest('GET','/api/error')">
                        Server Error (500)
                    </button>
                </div>

                <div class="card full-width">
                    <h3 style="color: #58a6ff;">
                        Request & Response
                    </h3>
                    <div class="output-area" id="output">
Waiting for a request...

Click any button above to see the HTTP
request and response in detail.
                    </div>
                </div>
            </div>
        </div>

        <script>
            const output = document.getElementById('output');

            async function makeRequest(
                method, url, body = null, headers = {}
            ) {
                const startTime = performance.now();

                let requestInfo = '';
                requestInfo += '━━━ REQUEST ━━━━━━━━━━━━━━━━━━━━━━━\\n';
                requestInfo += method + ' ' + url + ' HTTP/1.1\\n';
                requestInfo += 'Host: localhost:3000\\n';

                const fetchOptions = {
                    method: method,
                    headers: {
                        'Accept': 'application/json',
                        ...headers
                    }
                };

                if (body) {
                    fetchOptions.headers['Content-Type']
                        = 'application/json';
                    fetchOptions.body = JSON.stringify(body);
                    requestInfo
                        += 'Content-Type: application/json\\n';
                    requestInfo += '\\n';
                    requestInfo += JSON.stringify(body, null, 2);
                }

                Object.keys(headers).forEach(h => {
                    requestInfo += h + ': ' + headers[h] + '\\n';
                });

                try {
                    const response = await fetch(url, fetchOptions);
                    const endTime = performance.now();
                    const duration
                        = (endTime - startTime).toFixed(2);

                    let responseInfo = '';
                    responseInfo
                        += '\\n\\n━━━ RESPONSE ━━━━━━━━━━━━━━━━━━━━━━\\n';
                    responseInfo
                        += 'HTTP/1.1 ' + response.status
                        + ' ' + response.statusText + '\\n';

                    response.headers.forEach((value, key) => {
                        responseInfo += key + ': ' + value + '\\n';
                    });

                    if (response.status !== 204) {
                        const data = await response.json();
                        responseInfo += '\\n';
                        responseInfo
                            += JSON.stringify(data, null, 2);
                    } else {
                        responseInfo
                            += '\\n(No Content — Empty Body)';
                    }

                    responseInfo
                        += '\\n\\n⏱ Response time: '
                        + duration + 'ms';

                    output.textContent
                        = requestInfo + responseInfo;
                } catch (error) {
                    output.textContent
                        = requestInfo
                        + '\\n\\nERROR: ' + error.message;
                }
            }

            function createProduct() {
                const name
                    = document.getElementById('postName').value;
                const price
                    = parseFloat(
                        document.getElementById('postPrice').value
                    );
                const category
                    = document.getElementById('postCategory').value;

                makeRequest('POST', '/api/products', {
                    name, price, category
                });
            }

            function createInvalid() {
                makeRequest('POST', '/api/products', {
                    price: 'not a number'
                });
            }

            function replaceProduct() {
                const id
                    = document.getElementById('putId').value;
                const name
                    = document.getElementById('putName').value;
                const price
                    = parseFloat(
                        document.getElementById('putPrice').value
                    );

                makeRequest(
                    'PUT',
                    '/api/products/' + id,
                    { name, price, category: 'Electronics' }
                );
            }

            function updateProduct() {
                const id
                    = document.getElementById('patchId').value;
                const price
                    = parseFloat(
                        document.getElementById('patchPrice').value
                    );

                makeRequest(
                    'PATCH',
                    '/api/products/' + id,
                    { price }
                );
            }

            function deleteProduct() {
                const id
                    = document.getElementById('deleteId').value;
                makeRequest(
                    'DELETE',
                    '/api/products/' + id
                );
            }

            function makeAuthRequest(token) {
                makeRequest('GET', '/api/admin', null, {
                    'Authorization': 'Bearer ' + token
                });
            }
        </script>
    </body>
    </html>
    `;
}

const PORT = 3001;
server.listen(PORT, ()=> {
    console.log('='.repeat(50));
    console.log('HTTP Methods & Status Codes Demo');
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('='.repeat(50));
});