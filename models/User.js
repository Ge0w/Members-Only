const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Create User Schema
const UserSchema = new Schema({
    firstname: { type: String },
    lastname: { type: String },
    username: { type: String },
    password: { type: String },
    membershipStatus: { type: Boolean },
})

module.exports = User = mongoose.model('user', UserSchema)