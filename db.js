const mongoose = require('mongoose')
require('dotenv').config()

const DB_URI = process.env.DB_URI || 'mongodb://127.0.0.1:27017/yelpcamp'
const connection = mongoose.connection

const handleError = (err) => {
    console.error('There was a problem connecting to the database: ', err)
    process.exit(1)
}

connection.on('connected', () => console.log('MongoDB connected!'))
connection.on('disconnected', () => console.log('The database is now disconnected.'))

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI)
    } catch (err) {
        handleError(err)
    }
}

module.exports = connectDB