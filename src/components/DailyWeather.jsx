import React from 'react';
import '../styling/dailyweather.css';
import Loading from '../layout/Loading';
import { Link } from 'react-router-dom';
import {
  BsSun,
  BsCloudDrizzle,
  BsCloudRainHeavy,
  BsClouds,
  BsSnow,
  BsCloudLightningRain,
} from 'react-icons/bs';
import { BiError } from 'react-icons/bi';

const DailyWeather = ({ loading, daily, timezone, location }) => {
  let shortedDaily = daily.slice(1, 8);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <h3
          style={{
            textAlign: 'center',
            marginTop: '10px',
            // textTransform: 'capitalize',
            color: 'whitesmoke',
            textShadow: '1.5px 1.5px 3px black',
          }}
        >
          {location}, next week
        </h3>
        <section className="daily-weather">
          <div className="daily-forecast-info">
            {shortedDaily.map((data, index) => {
              return (
                <div className="daily-square-forecast" key={index}>
                  <div className="daily-date">
                    {new Date(data.dt * 1000).toLocaleDateString([], {
                      timeZone: timezone,
                      weekday: 'short',
                      day: 'numeric',
                    })}
                    <div className="daily-type">
                      <div className="daily-icon">
                        {data.weather.map(i => {
                          let type = i.description;
                          if (type.includes('clouds')) {
                            return <BsClouds style={{ color: 'smokewhite' }} />;
                          } else if (type.includes('clear')) {
                            return <BsSun style={{ color: 'yellow' }} />;
                          } else if (type.includes('snow')) {
                            return (
                              <BsSnow style={{ color: 'rgb(172, 252, 255)' }} />
                            );
                          } else if (type.includes('rain')) {
                            return (
                              <BsCloudRainHeavy
                                style={{ color: 'rgb(0, 39, 145)' }}
                              />
                            );
                          } else if (type.includes('drizzle')) {
                            return (
                              <BsCloudDrizzle
                                style={{ color: 'rgb(27, 79, 223)' }}
                              />
                            );
                          } else if (type.includes('thunderstorm')) {
                            return (
                              <BsCloudLightningRain style={{ color: 'gray' }} />
                            );
                          } else {
                            return <BiError />;
                          }
                        })}
                      </div>
                      {data.weather.map(w => w.description)}
                    </div>
                  </div>
                  <div className="daily-temp">
                    Min {Math.ceil(data.temp.min)} °C <br /> Max{' '}
                    {Math.ceil(data.temp.max)} °C
                  </div>

                  {/* <div className="daily-humidity">
                    Humidity {Math.floor(data.humidity)}%
                  </div> */}
                  <div className="daily-chance-rain">
                    Rain {Math.round(data.pop * 100)}%
                    {data.rain > 1 ? (
                      <div className="daily-rain">
                        {Math.ceil(data.rain)}mm rain
                      </div>
                    ) : (
                      <div>No Rain</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <div className="weather-btn-container">
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <Link to="/">Back to Main</Link>
          </div>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <Link to="/ForecastDisplay">Go to Hourly</Link>
          </div>
        </div>
      </div>
    );
  }
};

export default DailyWeather;
