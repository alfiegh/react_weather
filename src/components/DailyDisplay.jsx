import React from 'react';
import DailyWeather from './DailyWeather';

const DailyDisplay = ({ loading, getDaily, daily, timezone, location }) => {
  if (location) {
    return (
      <section>
        <DailyWeather
          loading={loading}
          getDaily={getDaily}
          daily={daily}
          timezone={timezone}
          location={location}
        />
      </section>
    );
  } else {
    return <div></div>;
  }
};

export default DailyDisplay;
