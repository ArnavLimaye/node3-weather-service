const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setting handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directories to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res) => {
    res.render('index', {
        title : 'Weather',
        name: 'Arnav Limaye'        
    });
});

app.get('/about',(req,res) => {
    res.render('about', {
        title : 'About Me',
        name: 'Arnav Limaye'        
    });
});

app.get('/help',(req,res) => {
    res.render('help', {
        title : 'Help',
        message: 'For more help contact abc@example.com',
        name: 'Arnav Limaye'        
    });
});

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error : 'Address must be provided'
        });
    }

    const address = req.query.address;
    geocode(address,(error,{latitude,longitude,location} = {}) => {
        if(error){
            return res.send({
                error
            });
        }
        forecast(latitude,longitude, (error, forecast) => {
            if(error){
                return res.send({
                            error
                        });
            }
            res.send({
                forecast,
                location
            });
        })        
    })
});

app.get('/help/*',(req,res) => {
    res.render('404',{
        title : 'error',
        errorMessage : 'Help article not found',
        name : 'Arnav Limaye'
    })
});

app.get('*',(req,res) => {
    res.render('404',{
        title : 'Error',
        errorMessage : 'Page not found',
        name : 'Arnav Limaye'
    })
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});