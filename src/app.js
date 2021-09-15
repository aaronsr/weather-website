const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geoCode = require('./utils/geocode')

// Initialize the express application
const app = express()

const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partials = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partials)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Aaron'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            Error: 'You must provide a search term of address=city'
        })        
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                Location: location,
                Forecast: forecastData.Forecast,
                Search: req.query.address
            })
        })
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Aaron'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'We are here to help',
        name: 'Aaron',
        helpText: 'Hello, we are sorry you need help. We wish you the best of luck ;-)'
    })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=> {
    res.render('404', {
        name: 'Aaron',
        title: "404",
        message: "That help article not found"
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        name: 'Aaron',
        title: '404',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
