const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// define paths for express configs
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to use
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        'title': 'Weather',
        'name': 'Jalla Syam'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        'title': 'About Me',
        'name': 'Jalla Syam'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        'helpText': 'This is my help',
        'title': 'Help',
        'name': 'Jalla Syam'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    } 
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
            } 
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })            
        })
    })      
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error : 'You must provide search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        'title': '404',
        'name': 'Jalla Syam',
        'errormsg': 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        'title': '404',
        'name': 'Jalla Syam',
        'errormsg': 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up and runnig on port '+port)
})