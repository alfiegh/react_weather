import React, { useEffect } from 'react';
import '../styling/mainweather.css';
import Loading from '../layout/Loading';
import { Link } from 'react-router-dom';
import rainbg from '../layout/img/rain_3.jpg';
import cloudybg from '../layout/img/clouds.jpg';
import clearbg from '../layout/img/clear2.jpg';
import stormybg from '../layout/img/thunderstorm.jpg';
import drizzlingbg from '../layout/img/rain2.jpg';
import snowbg from '../layout/img/snow.jpg';
import weatherbg from '../layout/img/weather2.jpg';
import {
  BsSun,
  BsClouds,
  BsSunrise,
  BsSunset,
  BsCloudRain,
  BsCloudRainHeavy,
  BsCloudDrizzle,
  BsCloudLightningRain,
  BsSnow,
} from 'react-icons/bs';
import { CgThermostat } from 'react-icons/cg';
import { WiHumidity, WiBarometer, WiRaindrops } from 'react-icons/wi';
import { GiWindsock } from 'react-icons/gi';
import { MdOutlineVisibility } from 'react-icons/md';
import { FaCloudscale } from 'react-icons/fa';
import { BiError } from 'react-icons/bi';

//TODO -> fix bug when two w.main are available
//TODO -> Refactor to fn w/loop

const MainWeather = ({ loading, getData, current, location, timezone }) => {
  //Fn to Change background upon weather condition

  function bgImg(text) {
    let body = document.querySelector('body');
    const overlay = document.querySelector('.app');
    overlay.classList.add('overlay');

    switch (text) {
      case 'Clear':
        body.style.background = `center / cover no-repeat url(${clearbg})`;
        break;
      case 'Rain':
        body.style.background = `center / cover no-repeat url(${rainbg})`;
        break;
      case 'Storm':
        body.style.background = `center / cover no-repeat url(${stormybg})`;
        break;
      case 'Clouds':
        body.style.background = `center / cover no-repeat url(${cloudybg})`;
        break;
      case 'Drizzle':
        body.style.background = `center / cover no-repeat url(${drizzlingbg})`;
        break;
      case 'Snow':
        body.style.background = `center / cover no-repeat url(${snowbg})`;
        break;
      default:
        body.style.background = `center / cover no-repeat url(${weatherbg})`;

        break;
    }
  }

  // useEffect(() => {
  //   if (!loading) {
  //     setTimeout(getData, 100);
  //   }
  // }, [loading, getData]);

  useEffect(() => {
    if (!loading) {
      getData();
    }
  }, [loading, getData]);

  const {
    weather,
    dt,
    sunrise,
    sunset,
    temp,
    feels_like,
    pressure,
    humidity,
    dew_point,
    clouds,
    uvi,
    visibility,
    wind_speed,
    rain,
    snow,
  } = current;

  if (loading) {
    return <Loading />;
  } else {
    return (
      <section className="main-weather">
        <div className="weather-info-main">
          <h4 className="main-date">{new Date(dt * 1000).toDateString()}</h4>
          <h4 className="main-time">
            {new Date(dt * 1000).toLocaleTimeString([], {
              timeZone: timezone,
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
          </h4>
          <h1 className="main-location">{location}</h1>

          <h4 className="main-temp">{Math.floor(temp)} °C</h4>
          {weather ? (
            <h4 className="main-type">
              <div className="main-icon">
                {weather.map(i => {
                  let type = i.description;
                  if (type.includes('clouds')) {
                    return <BsClouds style={{ color: 'smokewhite' }} />;
                  } else if (type.includes('clear')) {
                    return <BsSun style={{ color: 'yellow' }} />;
                  } else if (type.includes('snow')) {
                    return <BsSnow style={{ color: 'rgb(172, 252, 255)' }} />;
                  } else if (type.includes('rain')) {
                    return (
                      <BsCloudRainHeavy style={{ color: 'rgb(0, 39, 145)' }} />
                    );
                  } else if (type.includes('drizzle')) {
                    return (
                      <BsCloudDrizzle style={{ color: 'rgb(27, 79, 223)' }} />
                    );
                  } else if (type.includes('thunderstorm')) {
                    return <BsCloudLightningRain style={{ color: 'gray' }} />;
                  } else {
                    return <BiError style={{ color: 'red' }} />;
                  }
                })}
              </div>
              {weather.map(w => w.description.toUpperCase())}
            </h4>
          ) : (
            ''
          )}
        </div>
        <div className="main-extra-container">
          <div className="weather-info-extra">
            <div className="square-info">
              <p>
                Sunrise <BsSunrise />
              </p>
              {new Date(sunrise * 1000).toLocaleTimeString([], {
                timeZone: timezone,
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}{' '}
            </div>
            <div className="square-info">
              <p>
                Sunset <BsSunset />
              </p>
              {new Date(sunset * 1000).toLocaleTimeString([], {
                timeZone: timezone,
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}{' '}
            </div>
            <div className="square-info">
              <p>
                Feels Like <CgThermostat />
              </p>
              {Math.floor(feels_like)} °C
            </div>
            <div className="square-info">
              <p>
                UV Index <FaCloudscale />
              </p>
              {Math.floor(uvi)}
            </div>
            <div className="square-info">
              <p>
                Humidity <WiHumidity />
              </p>
              {humidity}%
            </div>
            {rain ? (
              <div className="square-info">
                <p className="rain-p">
                  Rain <BsCloudRain />
                </p>
                {Math.ceil(Object.values(rain))} mm
              </div>
            ) : (
              <div className="square-info">No Rain</div>
            )}
          </div>
          <div className="weather-info-extra">
            <div className="square-info">
              <p>
                Clouds <BsClouds />
              </p>
              {clouds}%
            </div>
            <div className="square-info">
              <p className="wind-p">
                Wind
                <GiWindsock />
              </p>
              {Math.floor(wind_speed * 3.6)} kmh
            </div>
            <div className="square-info">
              <p>
                Pressure <WiBarometer />
              </p>
              {pressure}hPa
            </div>
            <div className="square-info">
              <p>
                Visibility <MdOutlineVisibility />
              </p>
              {visibility / 1000}Kms
            </div>

            <div className="square-info">
              <p>
                Dew Point <WiRaindrops />
              </p>
              {Math.floor(dew_point)}C
            </div>
            {snow ? (
              <div className="square-info">
                <p>
                  Snow <BsSnow />
                </p>
                {Object.values(snow)} mm
              </div>
            ) : (
              <div className="square-info">No Snow</div>
            )}
          </div>
        </div>
        <div className="weather-btn-container">
          <div
            style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}
          >
            <Link to="/ForecastDisplay">Next 12 Hours</Link>
          </div>
          <div
            style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}
          >
            <Link to="/DailyDisplay">Next 7 days</Link>
          </div>
        </div>
        {weather ? <div>{bgImg(`${weather.map(w => w.main)}`)}</div> : null}
      </section>
    );
  }
};

export default MainWeather;
