import { Card, Spin } from 'antd';
import { useEffect, useState } from 'react';

interface Props {
  latitude: number;
  longitude: number;
  isImperial: boolean;
}

function getTemperature(isImperial: boolean, celsius: number) {
  return isImperial ? celsius * 1.8 + 32 : celsius;
}

function getSpeed(isImperial: boolean, kmh: number) {
  return isImperial ? kmh * 0.621371 : kmh;
}

function getWindSpeedUnit(isImperial: boolean) {
  return isImperial ? 'mph' : 'km/h';
}

function getTemperatureUnit(isImperial: boolean) {
  return isImperial ? '°F' : '°C';
}

async function getWeather(longitude: number, latitude: number) {
  return fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
  ).then((res) => res.json());
}

export default function WeatherCard({ latitude, longitude, isImperial }: Props) {
  const [weather, setWeather] = useState<any | null>(null);

  useEffect(() => {
    getWeather(longitude, latitude).then(setWeather);
  }, [latitude, longitude]);

  return (
    <Card title="Current Weather" loading={weather === null} style={{ width: '100%' }} size="small">
      <p>
        <strong>Temperature:</strong>{' '}
        {weather &&
          getTemperature(isImperial, weather.current.temperature_2m).toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
        {getTemperatureUnit(isImperial)}
      </p>
      <p>
        <strong>Wind Speed:</strong>{' '}
        {weather &&
          getSpeed(isImperial, weather.current.wind_speed_10m).toLocaleString(undefined, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
        {getWindSpeedUnit(isImperial)}
      </p>
    </Card>
  );
}
