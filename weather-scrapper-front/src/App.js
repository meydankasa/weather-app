import React from 'react';
import './App.css';
import axios from 'axios';
import City from './city';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.notFirst = false;
    this.state = {
      countryList: [],
      cityList: [],
      city: '',
      country: ''
    }
  }

  getCountries() {
    axios.get('http://localhost:7000/countries')
      .then((result) => {
        if (result) {
          //console.log(result.data);
          
          this.setState({ countryList: result.data.countries })
        }
      })
  }

  getCities(country) {
    axios.post('http://localhost:7000/cities', { country: country })
      .then((result) => {
        if (result) {
          //console.log(result.data);

          this.setState({ cityList: result.data.cities })
        }
      })
  }

  componentDidMount() {
    this.getCountries()
  }

  handleInput = (e) => {
    let input = e.target.value;

    this.notFirst = true; 
    if (e.target.name === 'country') {
      this.setState({ country: input }, this.getCities(input))
    }
    else {
      this.setState({ city: input })
    } 

  }

  render() {

    return (
      <header id="mainHeader">
        <div class="container clear-fix">
          <div class="cloud1"></div>
          <div class="cloud2"></div>
          <div class="cloud3"></div>
          <div class="logo">
            
            <div className="app-container">
            <div>
              <h1> Weather App </h1>
              <h2>Meydan Kasa</h2>
            </div>

              <div className="inputs">
                <select name="country" className="form-control" onChange={this.handleInput}>
                  <option>Choose Country</option>
                  {
                    this.state.countryList.map((x, index) => {
                      return <option value={x} key={index}>{x}</option>
                    })
                  }
                </select>

                <select name="city" className="form-control" onChange={this.handleInput}>
                  <option>Choose City</option>
                  {
                    this.state.cityList.length > 0 && this.state.cityList.map((x, index) => {
                      return <option value={x} key={index}>{x}</option>
                    })
                  }
                </select>
              </div>

              <div>
                {this.notFirst ? (<City notFirst={this.notFirst} city={this.state.city} country={this.state.country} />) :
                  (<div className="weather-result">
                    <City country="israel" city="Tel-Aviv" />
                    <City country="France" city="Paris" />
                    <City country="UK" city="London" />
                  </div>
                  )

                }
              </div>
            </div>
           </div>
         </div>
       </header>
    );
  }
}

export default App;
