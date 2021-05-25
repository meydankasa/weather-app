const cheerio = require('cheerio');
const request = require('request');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/forecast', (req, res) => {

    getForecast(req.body.city.replace(/ /g,''),req.body.country.replace(/ /g,''), res);
})

app.get('/countries', (req, res) => {
    
    getCountries(res);
})

app.post('/cities', (req, res) => {
    
    getCities(req.body.country, res);
})

app.listen(7000, () => console.log('Server is listening at port 7000'));

function getForecast(city, country, res) {
    request(`https://www.timeanddate.com/weather/${country}/${city}/ext`, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html)

            let days = [];

            $('#wt-ext tbody tr').each((i, el) => {

                let obj = {
                    day: $(el).children().eq(0).text(),
                    temp: $(el).children().eq(2).text(),
                    weather: $(el).children().eq(3).text(),
                    wind: $(el).children().eq(5).text(),
                    humidity: $(el).children().eq(7).text(),
                    image: $(el).find('.wt-ic img').attr('src')
                }
                days.push(obj);
            })
            res.status(200).json({ days: days });
        }
        if (error) {
            console.log(error);
        }
    });
}

function getCountries(res) {

    request(`https://www.worldometers.info/geography/alphabetical-list-of-countries/`, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html)

            let countries = [];

            $('table tr').each((i, el) => {
                countries.push($(el).children().eq(1).text())
            })

            res.status(200).json({ countries: countries });

        }
        if (error) {
            console.log(error);
        }
    });
}

function getCities(country,res) {

    request(`https://www.timeanddate.com/weather/${country}`, (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html)

            let cities = [];

            $('.zebra a').each((i, el) => {
                cities.push($(el).text())
            })
            res.status(200).json({ cities: cities });          
            
        }
        if (error) {
            console.log(error);
        }
    });
}