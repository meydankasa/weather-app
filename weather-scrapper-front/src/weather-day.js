import React, { Component } from 'react';

class WeatherDay extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <div className="card">
                    <div className="top">
                    <h2>{this.props.day.substring(0,3)+" " +this.props.day.substring(3) } <br></br></h2>
                    <img src={this.props.image} width="70" alt="temp" />
                    <p><span>{this.props.weather}</span></p>
                    </div>                  
                    <div className="bottom">
                        <table className="table table-hover">
                            <tbody>
                            <tr><td><span>Temp</span>:</td><td>{this.props.temp}</td></tr>
                            <tr><td><span>Humidity</span></td><td>{this.props.humidity}</td></tr>
                            <tr><td><span>Wind</span></td><td>{this.props.wind}</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default WeatherDay;