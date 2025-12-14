require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const engine = require('ejs-mate')
const path = require('path')
const methodOverride = require('method-override')
const morgan = require('morgan') 
const campgroundRoutes = require('./routes/campgrounds.js')
const connectDB = require('./db.js')

const app = express()
const PORT = process.env.PORT || 5000


connectDB()

app.engine('ejs', engine)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views')) // This says, look in the folder where this index.js file is and look for the views folder for my templates

app.use(morgan('dev')) // Logs every incoming request to the console, formatted nicely, so you can know if things are working or failing
app.use(express.json()) // Parses user req data, turns it into a JS object and attaches it to the req body
app.use(express.urlencoded({extended: true})) // Parses form data, turns it to a JS object, and attaches it to req body
app.use(methodOverride('_method'))

app.use('/campgrounds', campgroundRoutes)

app.get('/', (req, res) => {
    res.render('home')
})


app.listen(PORT, () => {
    console.log('The server is running on port: ', PORT)
})