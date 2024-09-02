exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: "This is static JSON data",
      data: {
        key: "value",
        status: "success"
      }
    })
  };
};