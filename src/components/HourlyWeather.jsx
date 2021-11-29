import React from 'react';
import '../styling/hourlyweather.css';
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

const HourlyWeather = ({ loading, hourly, timezone, location }) => {
  let shortedArr = hourly.slice(1, 14);
  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <h3
          style={{
            textAlign: 'center',
            marginTop: '8px',
            // textTransform: 'capitalize',
            color: 'whitesmoke',
            textShadow: '1.5px 1.5px 3px black',
          }}
        >
          {location}, next hours
        </h3>
        <section className="hourly-weather">
          <div className="forecast-info-main">
            {shortedArr.map((data, index) => {
              return (
                <div className="square-forecast" key={index}>
                  <div className="hourly-date">
                    {new Date(data.dt * 1000).toLocaleTimeString([], {
                      timeZone: timezone,
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </div>
                  <div className="hourly-temp">{Math.ceil(data.temp)} °C</div>
                  <div className="hourly-icon">
                    {data.weather.map(i => {
                      let type = i.description;
                      if (type.includes('clouds')) {
                        return <BsClouds style={{ color: 'whitesmoke' }} />;
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
                          <BsCloudLightningRain
                            style={{
                              color: 'rgb(252, 220, 193)',
                            }}
                          />
                        );
                      } else {
                        return <BiError />;
                      }
                    })}
                  </div>
                  <div className="hourly-type">
                    {data.weather.map(w => w.description)}
                  </div>
                  <div className="hourly-rain-pop">
                    Rain {Math.ceil(data.pop * 100)}%
                  </div>
                  {/* <div className="hourly-uv">
                    UV Index {Math.floor(data.uvi)}
                  </div> */}
                  {/* {data.rain > 1 ? (
                    <div className="hourly-rain">
                      {Math.ceil(Object.values(data.rain))} mm rain
                    </div>
                  ) : (
                    <div>Rain 0 mm</div>
                  )}
                  {data.snow > 1 ? (
                    <div className="hourly-snow">
                      {Math.ceil(Object.values(data.snow))} mm snow
                    </div>
                  ) : (
                    <div>Snow 0 mm</div>
                  )} */}
                </div>
              );
            })}
          </div>
        </section>
        <div className="weather-btn-container">
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <Link to="/react_weather">Back to Main</Link>
          </div>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <Link to="/DailyDisplay">Go to Daily</Link>
          </div>
        </div>
      </div>
    );
  }
};

export default HourlyWeather;
