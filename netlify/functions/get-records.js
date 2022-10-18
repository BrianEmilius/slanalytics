var connect = require("../mongodb")

async function getRecords(space, start, end) {
	const db = await connect()

	const agg = [
		{
			'$match': {
				'space': space
			}
		},{
			"$match": {
				"time": { "$gt": parseInt(start) }
			}
		},{
			"$match": {
				"time": { "$lt": parseInt(end) }
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

	return getRecords(searchParams.get("space"), searchParams.get("start"), searchParams.get("end"))
}
