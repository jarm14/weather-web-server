const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewaPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewaPath)
hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Joel Rivera'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Joel Rivera'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a help page',
        name: 'Joel Rivera'
    })
})

app.get('/weather', (req, res) => {
    const { address } = req.query

    if (!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(address, (error, { latitud, longitud, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitud, longitud, (error, forecast) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast,
                location,
                address
            })
        })
    })
})

app.get('products', (req, res) => {
    console.log(req.query)
    res.send({ products: [] })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        name: 'Joel Rivera',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        name: 'Joel Rivera',
        message: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

//app.com
//app.com/help
//app.com/about
/*app.get('/help', (req, res) => {
    res.send([
        { name: 'Joel', age: 25 },
        { name: 'Diego', age: 24 }
    ])
})

app.get('/about', (req, res) => {
    res.send('<h1>About page</h1>')
})*/

//console.log(__dirname)
//console.log(__filename)