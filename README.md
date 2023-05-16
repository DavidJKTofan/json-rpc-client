# JSON-RPC Client code

Small JSON-RPC client-side demo.

## JSON-RPC Server code

This is deployed on Cloudflare Workers.

```
async function handleRequest(request) {
  // Handle Preflight OPTIONS request separately
  if (request.method === "OPTIONS") {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    };
    return new Response(null, { headers: headers });
  }
  
  const rpcRequest = await request.json();

  // Handle JSON-RPC requests
  const rpcResponse = await processJsonRpcRequest(rpcRequest);

  // Add CORS headers
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*", // Allow requests from all origins
    "Access-Control-Allow-Methods": "POST, OPTIONS", // Allow only POST, OPTIONS requests
    "Access-Control-Allow-Headers": "*", // Allow all headers
  };

  // Return the JSON-RPC response
  return new Response(JSON.stringify(rpcResponse), {
    headers: headers,
  });
}

async function processJsonRpcRequest(request) {
  // Check if it is a valid JSON-RPC request
  if (
    typeof request === 'object' &&
    request !== null &&
    request.jsonrpc === '2.0' &&
    typeof request.method === 'string'
  ) {
    // Process the JSON-RPC request
    const method = request.method;
    const params = request.params;

    // Call the appropriate method
    let result;
    if (method === 'method1') {
      result = await method1(params);
    } else if (method === 'method2') {
      result = await method2(params);
    } else {
      // Handle unknown method
      return createErrorResponse('Method not found');
    }

    // Return the JSON-RPC response with the result
    return createSuccessResponse(result);
  } else {
    // Invalid JSON-RPC request
    return createErrorResponse('Invalid JSON-RPC request');
  }
}

async function method1(params) {
  // Implementation of method1
  return 'Result of method1';
}

async function method2(params) {
  // Implementation of method2
  return 'Result of method2';
}

function createSuccessResponse(result) {
  return {
    jsonrpc: '2.0',
    result: result,
    id: 1, // Unique request ID
  };
}

function createErrorResponse(errorMsg) {
  return {
    jsonrpc: '2.0',
    error: {
      code: -1,
      message: errorMsg,
    },
    id: 1, // Unique request ID
  };
}

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});
```
