import React, { Component } from 'react';
import WeatherDay from './weather-day';
import loader from './images/filter-loader.gif';
import axios from 'axios';

class City extends Component {
    constructor(props) {
        super(props);
        this.loading = false;
        this.state = {
            days: []
        }
    }

    getForecast(city, country) {

        this.loading = true;
        axios.post('http://localhost:7000/forecast', { city: city, country: country })
            .then((result) => {
                if (result) {
                    if (this.props.notFirst) {
                        result.data.days.splice(5)
                    }
                    else {
                        result.data.days.splice(1)
                    } 

                    this.loading = false;
                    this.setState({ days: result.data.days })
                }
            })
    }

    componentWillReceiveProps(props) {

        if (props.city.length > 0 && props.country.length > 0) {
            this.getForecast(props.city, props.country);
        }
    }

    render() {

        if (this.loading) {
            return <div className="loader"><img src={loader} alt="Loader" /></div>
        }
        return (
            <div>
                <h2 className="title">{this.props.country} <br /> {this.props.city}</h2>
                <div className="weather-container">
                    {
                        this.state.days.map((x, index) => {
                            return <WeatherDay key={index} day={x.day} temp={x.temp} humidity={x.humidity} wind={x.wind} weather={x.weather} image={x.image} />
                        })
                    }
                </div>
            </div>
        );
    }
}

export default City;