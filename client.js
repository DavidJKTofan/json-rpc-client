const resultContainer = document.getElementById("resultContainer");

// Client application code
async function makeJsonRpcRequest(method, params) {
    const url = "https://grpc.automatic-demo.com/";

    const rpcRequest = {
        jsonrpc: "2.0",
        method: method,
        params: params,
        id: 1, // Unique request ID
    };

    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(rpcRequest),
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        },
    });

    const rpcResponse = await response.json();

    if ("error" in rpcResponse) {
        console.log("rpcResponse Error on POST request.");
        throw new Error(rpcResponse.error.message);
    }
    return rpcResponse;
}

// Client-side code (continued)
async function runDemo() {
    try {
        //   const method = "method1";
        //   const params = { param1: "value1", param2: "value2" };
        //   const result = await makeJsonRpcRequest(method, params);
        //   console.log("Result:", result);

        // Generate random parameters
        const params = generateRandomParams();
        console.log("params: ", params)
        // Randomly select method1 or method2
        const method = Math.random() < 0.5 ? "method1" : "method2";
        console.log("method: ", method)
        const response = await makeJsonRpcRequest(method, params);
        console.log("makeJsonRpcRequest", response)

        // Access the result and cfData properties from the response
        const {
            result: rpcResult,
            cfData
        } = response;
        // Update the result in the HTML div
        const resultDiv = document.getElementById("result");
        resultDiv.innerHTML += `
      <p><strong>Method:</strong> ${method}</p>
      <p><strong>Params:</strong> ${JSON.stringify(params)}</p>
      <p><strong>Result:</strong> ${rpcResult}</p>
      <p><strong>Country:</strong> ${cfData.country}</p>
      <p><strong>City:</strong> ${cfData.city}</p>
      <hr>
    `;
        console.log("Result:", rpcResult);

    } catch (error) {
        console.error("Error:", error.message);
    }
}

function generateRandomParams() {
    // Generate random parameter values as needed
    const param1 = Math.random().toString(36).substr(2, 8);
    const param2 = Math.random().toString(36).substr(2, 8);

    return {
        param1,
        param2
    };
}

// runDemo();
// Run the code every few milliseconds
setInterval(runDemo, Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000);
