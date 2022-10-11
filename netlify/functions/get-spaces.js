var connect = require("../mongodb")

async function getSpaces() {
	var db = await connect()
	var result = await db.collection("spaces").find({}).toArray()

	return {
		statusCode: 200,
		body: JSON.stringify(result)
	}
}

module.exports.handler = async function(event, context) {
	context.callbackWaitsForEmptyEventLoop = false

	// Check HTTP Method
	if (event.httpMethod !== "GET") return {
		statusCode: 405,
		body: "METHOD NOT ALLOWED",
		headers: {
			"Allow": "GET"
		}
	}

	return getSpaces()
}
