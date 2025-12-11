require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const Campground = require('./models/campground.js')
const connectDB = require('./db.js')


connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')) // This says, look in the folder where this index.js file is and look for the views folder for my templates

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', {campgrounds})
})

app.get('/campgrounds/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/show', {campground})
})

app.listen(PORT, () => {
    console.log('The server is running on port: ', PORT)
})