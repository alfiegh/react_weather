import './App.css';
import axios from 'axios';
import React, { Component, Fragment } from 'react';
import Navbar from './layout/Navbar';
import Search from './components/Search';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import DailyDisplay from './components/DailyDisplay';
import Alert from './layout/Alert';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

class App extends Component {
  state = {
    loading: false,
    coords: {},
    location: '',
    current: {},
    timezone: '',
    hourly: [],
    daily: [],
    alert: null,
  };

  searchCoords = async text => {
    try {
      this.setState({ loading: true });

      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${process.env.REACT_APP_WEATHER_API}`
      );

      this.setState({
        loading: false,
        coords: res.data.coord,
        location: res.data.name,
      });
    } catch (err) {
      alert('City not found, please check spelling 🥵');
      this.setState({ location: '' });
    }
  };

  getData = async () => {
    let { lon, lat } = this.state.coords;

    const fullRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${process.env.REACT_APP_WEATHER_API}`
    );

    this.setState({
      current: fullRes.data.current,
      daily: fullRes.data.daily,
      hourly: fullRes.data.hourly,
      timezone: fullRes.data.timezone,
    });
  };

  setAlert = message => {
    this.setState({ alert: { message } });
    setTimeout(() => this.setState({ alert: null }), 1000);
  };

  render() {
    const { current, loading, location, timezone, hourly, daily, alert } =
      this.state;
    return (
      <Router>
        <div className="app">
          <Navbar />
          <Alert alert={alert} />
          <Routes>
            <Route
              path="/react_weather"
              element={
                <Fragment>
                  <Search
                    searchCity={this.searchCoords}
                    setAlert={this.setAlert}
                  />
                  <WeatherDisplay
                    loading={loading}
                    getData={this.getData}
                    current={current}
                    location={location}
                    timezone={timezone}
                  />
                </Fragment>
              }
            />
            <Route
              path="ForecastDisplay"
              element={
                <ForecastDisplay
                  loading={loading}
                  hourly={hourly}
                  location={location}
                  timezone={timezone}
                />
              }
            />
            {/* <Search searchCity={this.searchCoords} setAlert={this.setAlert} /> */}
            {/* <WeatherDisplay
              loading={loading}
              getData={this.getData}
              current={current}
              location={location}
              timezone={timezone}
            /> */}
            {/* <ForecastDisplay
              loading={loading}
              hourly={hourly}
              location={location}
              timezone={timezone}
            /> */}
            <Route
              path="DailyDisplay"
              element={
                <DailyDisplay
                  loading={loading}
                  location={location}
                  timezone={timezone}
                  daily={daily}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
