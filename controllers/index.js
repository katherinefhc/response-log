const {
	requestHistory
} = require('../models')

exports.saveRequestHistory = (req, res) => {
	const history = {
		request: {
			method: req.method,
			headers: req.headers,
			body: req.body,
			url: req.url,
			params: req.params,
			query: req.query,
		},
		response: {
			body: res.status == 200 ? res.body : '',
			status: res.status,
			message: res.status != 200 ? res.message : '',
		},
	}
	return requestHistory.create(history)
}

exports.getLatestHistory = () => {
	return requestHistory.find({}, {}, { sort: { createdAt: -1 }, limit: 10 })
}
