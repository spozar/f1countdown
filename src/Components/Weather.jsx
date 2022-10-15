import axios from "axios";
import { useEffect, useState } from "react";
import { Text } from "@mantine/core";

function Weather(props) {
  const weatherLink = {
    clearsky: "Clear sky",
    cloudy: "Cloudy",
    fair: "Fair",
    fog: "Fog",
    heavyrain: "Heavy rain",
    heavyrainandthunder: "Heavy rain and thunder",
    heavyrainshowers: "Heavy rain showers",
    heavyrainshowersandthunder: "Heavy rain showers and thunder",
    heavysleet: "Heavy sleet",
    heavysleetandthunder: "Heavy sleet and thunder",
    heavysleetshowers: "Heavy sleet showers",
    heavysleetshowersandthunder: "Heavy sleet showers and thunder",
    heavysnow: "Heavy snow",
    heavysnowandthunder: "Heavy snow and thunder",
    heavysnowshowers: "Heavy snow showers",
    heavysnowshowersandthunder: "Heavy snow showers and thunder",
    lightrain: "Light rain",
    lightrainandthunder: "Light rain and thunder",
    lightrainshowers: "Light rain showers",
    lightrainshowersandthunder: "Light rain showers and thunder",
    lightsleet: "Light sleet",
    lightsleetandthunder: "Light sleet and thunder",
    lightsleetshowers: "Light sleet showers",
    lightsnow: "Light snow",
    lightsnowandthunder: "Light snow and thunder",
    lightsnowshowers: "Light snow showers",
    lightssleetshowersandthunder: "Light sleet showers and thunder",
    lightssnowshowersandthunder: "Light snow showers and thunder",
    partlycloudy: "Partly cloudy",
    partlycloudy_night: "Partly cloudy night",
    rain: "Rain",
    rainandthunder: "Rain and thunder",
    rainshowers: "Rain showers",
    rainshowersandthunder: "Rain showers and thunder",
    sleet: "Sleet",
    sleetandthunder: "Sleet and thunder",
    sleetshowers: "Sleet showers",
    sleetshowersandthunder: "Sleet showers and thunder",
    snow: "Snow",
    snowandthunder: "Snow and thunder",
    snowshowers: "Snow showers",
    snowshowersandthunder: "Snow showers and thunder",
  };

  const [weatherApi, setWeatherApi] = useState();
  const [parsedWeather, setParsedWeather] = useState();

  useEffect(() => {
    axios(
      `https://api.met.no/weatherapi/locationforecast/2.0/?lat=${props.coords.lat}&lon=${props.coords.long}`
    ).then((res) => {
      console.log(res.data.properties.timeseries);
      setWeatherApi(res.data.properties.timeseries);
      console.log(props.date);
    });
  }, [props]);

  useEffect(() => {
    if (weatherApi) {
      weatherApi.every((element) => {
        if (element.time >= props.date) {
          setParsedWeather(element);
          console.log(element);
          return false;
        } else {
          return true;
        }
      });
    }
  }, [weatherApi, props]);

  if (parsedWeather) {
    return (
        <>
      <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
        <div>
          <Text
            color="white"
            weight={700}
            size="xl"
            style={{}}
          >
            {weatherLink[parsedWeather.data?.next_6_hours?.summary?.symbol_code.split('_')[0]]}{" "}
            &nbsp;&nbsp;
            <br/>
            <Text size="md">{parsedWeather.data.instant.details.air_temperature}
            °C</Text>
          </Text>
        </div>
        <div>
          {parsedWeather.data?.next_6_hours?.summary ? <img
            style={{ width: "70px"}}
            src={
              "https://api.met.no/images/weathericons/svg/" +
              parsedWeather.data?.next_6_hours?.summary?.symbol_code +
              ".svg"
            }
            alt="Weather"
          ></img> : <></>}

        </div>

        
      </div>
      {/* <div style={{}}>
      {parsedWeather.data.instant.details.air_temperature}°C
      </div> */}
      </>
    );
  } else {
    return <>Weather only available 10 days before race start</>;
  }
}

export default Weather;
