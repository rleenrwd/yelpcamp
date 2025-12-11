const mongoose = require('mongoose')
const cities = require('./cities.js')
const {places, descriptors} = require('./seedHelpers.js')
const Campground = require('../models/campground')
require('dotenv').config()
const connectDB = require('../db.js')
const db = mongoose.connection


const sample = (arr) => arr[Math.floor(Math.random() * arr.length)] // Gets a random index from inside the arr, and returns the value at that index

const seedDB = async () => {
    try {
        await connectDB()
        await Campground.deleteMany({})
        for (let i = 0; i < 50; i++) {
            const randomIndex = Math.floor(Math.random() * 1000) // Gets a random number from 0 to 999 
            const camp = new Campground({
                title: `${sample(descriptors)} ${sample(places)}`,
                location: `${cities[randomIndex].city}, ${cities[randomIndex].state}`
            })
            await camp.save()
        }
        console.log('The database was successfully seeded with campgrounds!')
    } catch (err) {
        console.error('There was an error seeding the DB: ', err)
        process.exit(1)
    } finally {
        await db.close()
        console.log('The database connection is now closed!') // The code in the finally block will always run no matter what
    }
    
}

seedDB()