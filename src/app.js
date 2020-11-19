const express = require('express'); 
const path = require('path'); 
const hbs = require('hbs'); 
const request = require('postman-request');
const bodyParser = require('body-parser');
const requestIP = require('request-ip'); 

const differenceInWeeks = require('date-fns/differenceInWeeks'); 
const differenceInDays = require('date-fns/differenceInDays');
const getWeek = require('date-fns/getWeek');
const getDay = require('date-fns/getDay')  


const app = express(); 

const viewsPath = path.join(__dirname, '/templates/views')

app.use(express.json()); 
app.use(bodyParser.urlencoded({extended: true})); 
// app.use(express.urlencoded({extended: true})); 

app.use(express.static(path.join(__dirname, 'public'))); 
app.set('view engine', 'hbs')
app.set('views', viewsPath)



app.get('/', (req,res)=>{
    res.render('index'); 
});

app.get('/location', (req,res)=> {
    const clientIP = requestIP.getClientIp(req); 

    request({url: `https://freegeoip.app/json/${clientIP}`, json: true}, (err, {body})=> {

        res.json({
            timeZone: body.time_zone, 
            city: body.city, 
            country: body.country_name
        });
    });

});

app.get('/quote', async (req,res)=> {

    request({url: 'https://api.quotable.io/random', json: true}, (err, {body})=> {

        res.json({
            content: body.content, 
            author: body.author
        })
    });
});

app.post('/dateMath', async (req,res)=> {
    const today = req.body[0]; 
    const janOne = req.body[1]; 

    const weeks = differenceInWeeks(new Date(today.year, today.month, today.day), new Date(janOne.year, janOne.month, janOne.day))
    const days = differenceInDays(new Date(today.year, today.month, today.day), new Date(janOne.year, janOne.month, janOne.day))
    const weekNumber = getWeek(new Date(today.year, today.month, today.day));
    const day = getDay(new Date(today.year, today.month, today.day));
    res.json({weeks, weekNumber, days, day});
})


app.all('*', (req,res)=> {
    res.render('index'); 
})

app.listen(process.env.PORT || 3000, ()=> {
    console.log('Server Started'); 
});
