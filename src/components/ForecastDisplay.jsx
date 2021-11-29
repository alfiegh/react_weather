import React from 'react';
import HourlyWeather from './HourlyWeather';

const ForecastDisplay = ({
  loading,
  timezone,
  getHourly,
  hourly,
  location,
}) => {
  if (location) {
    return (
      <section>
        <HourlyWeather
          loading={loading}
          getHourly={getHourly}
          hourly={hourly}
          timezone={timezone}
          location={location}
        />
      </section>
    );
  } else {
    return <div></div>;
  }
};

export default ForecastDisplay;
