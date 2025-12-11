require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const methodOverride = require('method-override')
const campgroundRoutes = require('./routes/campgrounds.js')
const connectDB = require('./db.js')



connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')) // This says, look in the folder where this index.js file is and look for the views folder for my templates

app.use(express.urlencoded({extended: true})) // This is used for HTML form submissions to parse the data into req.body
app.use(methodOverride('_method'))

app.use('/campgrounds', campgroundRoutes)

app.get('/', (req, res) => {
    res.render('home')
})


app.listen(PORT, () => {
    console.log('The server is running on port: ', PORT)
})