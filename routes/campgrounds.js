const express = require('express')
const router = express.Router()
const Campground = require('../models/campground')

// INDEX
router.get('/', async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', {campgrounds})
})

// NEW CAMPGROUND FORM
router.get('/new', (req, res) => {
    res.render('campgrounds/new')
})

// CREATE CAMPGROUND ROUTE
router.post('/', async (req, res) => {
    const campground = new Campground(req.body.campground)
    await campground.save()
    res.redirect(`/campgrounds/${campground._id}`)
})

// SHOW ROUTE
router.get('/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/show', {campground})
})

// EDIT FORM
router.get('/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', {campground})
})

// UPDATE CAMPGROUND ROUTE
router.put('/:id', async (req, res) => {
    const {id} = req.params
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground}) // The spread operator will copy the req.body campground object into the found campground and update
    res.redirect(`/campgrounds/${campground._id}`)
})

// DELETE CAMPGROUND ROUTE
router.delete('/:id', async (req, res) => {
    const {id} = req.params
    await Campground.findByIdAndDelete(id)
    res.redirect('/campgrounds')
})

module.exports = router