const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requestHistory = new Schema({
  request: {
    method: String,
    headers: Object,
    body: Object,
    url: Object,
    params: Object,
    query: Object,
  },
  response: {
    body: Object,
    status: String,
    message: String,
  },
}, { timestamps: true })


exports.requestHistory = mongoose.model('request-history', requestHistory)
