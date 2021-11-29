import React from 'react';
import MainWeather from './MainWeather';

const WeatherDisplay = ({ loading, getData, current, location, timezone }) => {
  if (location) {
    return (
      <section className="main-container">
        <MainWeather
          loading={loading}
          getData={getData}
          current={current}
          location={location}
          timezone={timezone}
        />
      </section>
    );
  } else {
    return <div></div>;
  }
};

export default WeatherDisplay;
