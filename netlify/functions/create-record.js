var connect = require("../mongodb")

async function createRecord(body) {
	const db = await connect()
	const bulk = db.collection("records").initializeUnorderedBulkOp()

	body.records?.forEach(record => bulk.insert({ space: body.space, time: new Date().valueOf(), key: record }))

	const result = await bulk.execute()

	return {
		statusCode: 201,
		body: JSON.stringify(result)
	}
}

module.exports.handler = async function(event, context) {
	context.callbackWaitsForEmptyEventLoop = false

	// Check HTTP Method
	if (event.httpMethod !== "POST") return {
		statusCode: 405,
		body: "METHOD NOT ALLOWED",
		headers: {
			"Allow": "POST"
		}
	}

	const body = JSON.parse(event.body)
	return createRecord(body)
}
