const issues = require("./issues.json");

exports.handler = async function(event) {
  // Get params from context
  const { id, title, description } = JSON.parse(event.body || "{}");
  const { id: deleteId } = event.queryStringParameters || {}; 
  // Set CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*", // This allows all domains. For production, specify your domain instead.
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
  };
  
  // Check for OPTIONS request (CORS preflight)
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers
    };
  }
  // Parse the HTTP method from the incoming request
  const httpMethod = event.httpMethod;
  
  // Handle different HTTP methods
  switch(httpMethod) {
    case "GET":
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Read operation - static JSON returned",
          issues
        }),
        headers
      };
      
      case "POST":
        const issue = createIssue(id, title, description);
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: "Create operation - received JSON object",
            receivedData: issue
          }),
          headers
        };

      case "PUT":
        const updatedIssue = updateIssue(id, title, description);
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: "Update operation - received JSON object",
            receivedData: updatedIssue
          }),
          headers
        };

      case "DELETE":
        const deletedIssue = deleteIssue(deleteId);
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: "Delete operation - received data",
            receivedData: deletedIssue
          }),
          headers
        };

      default:
        return {
          statusCode: 405,
          body: JSON.stringify({ error: "Method Not Allowed" }),
          headers
        };
  }
};

const createIssue = (id, title, description) => {
  const issue = {
    id,
    title,
    description
  };

  return issue;
}

const updateIssue = (id, title, description) => {
  const index = issues.find(issue => issue.id === id);
  if (index !== -1) {
    const issue = {
      id,
      title: title || issues[index].title,
      description: description || issues[index].description
    };
    return issue;
  }
}

const deleteIssue = (id) => {
  return issues.find(issue => issue.id == +id);
} 
