const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName:String,
    google: String,
    apple: String,
    phoneNumber:String
},
{ collection: 'users' });
const model = mongoose.model('User', userSchema);

module.exports = model