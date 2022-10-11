var connect = require("../mongodb")

async function getRecords(space) {
	const db = await connect()

	const date = new Date()
	const start = date.setUTCHours(0,0,0,0)
	const end = date.setUTCHours(23,59,59,999)

	const agg = [
		{
			'$match': {
				'space': space
			}
		},{
			"$match": {
				"time": { "$gt": start.valueOf() }
			}
		},{
			"$match": {
				"time": { "$lt": end.valueOf() }
			}
		}, {
			'$group': {
				'_id': {
					'space': '$space', 
					'time': '$time'
				}, 
				'numberOfVisitors': {
					'$sum': 1
				}
			}
		}, {
			'$sort': {
				'_id.time': 1
			}
		}
	]

	const cursor = db.collection("records").aggregate(agg)
	const result = await cursor.toArray()
	console.log(result)

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

	const searchParams = new URLSearchParams(event.rawQuery)

	return getRecords(searchParams.get("space"))
}
