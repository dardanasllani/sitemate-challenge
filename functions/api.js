const issues = require("./issues.json");

exports.handler = async function(event) {
  // Parse the HTTP method from the incoming request
  const httpMethod = event.httpMethod;
  
  // Handle different HTTP methods
  switch(httpMethod) {
    case "GET":
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Read operation - static JSON returned",
          data: issues
        })
      };
      
      case "POST":
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: "Create operation - received JSON object",
            receivedData: JSON.parse(event.body)
          })
        };

      case "PUT":
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: "Update operation - received JSON object",
            receivedData: JSON.parse(event.body)
          })
        };

      case "DELETE":
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: "Delete operation - received data",
            dataToDelete: event.queryStringParameters
          })
        };

      default:
        return {
          statusCode: 405,
          body: JSON.stringify({ error: "Method Not Allowed" })
        };
  }
};