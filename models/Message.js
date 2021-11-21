const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Create User Schema
const MessageSchema = new Schema({
    date: { type: Date, required: true},
    title: { type: String, required: true},
    message: { type: String, required: true},
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = Message = mongoose.model('message', MessageSchema)