import dotenv from 'dotenv';
dotenv.config();


// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}
// TODO: Define a class for the Weather object
class Weather {
  temperature: number;
  windSpeed: number;
  humidity: number;

  constructor (temperature: number, wind: number, humidity: number) {
    this.temperature = temperature;
    this.windSpeed = wind;
    this.humidity = humidity;
  }


}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  API_BASE_URL: string;
  API_KEY: string;

  constructor () {
    this.API_BASE_URL = process.env.API_BASE_URL || 'https://api.openweathermap.org';
    this.API_KEY = process.env.API_KEY || '';
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<Coordinates | null> {
    try {
    const responseFetch = await fetch(`${this.API_BASE_URL}/geo/1.0/direct?q=${query}&appid=${this.API_KEY}`);
    const geoData = await responseFetch.json();

    if (geoData.length > 0) {
      const { lat, lon } = geoData[0];
      return { latitude: lat, longitude: lon };
    } else {
      console.error('City not found');
      return null; 
    } 
  } catch (error) {
    console.error('Error fetching location data', error);
    return null;
  }   
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const { latitude, longitude } = locationData;
    return { latitude, longitude };

  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(city: string): string {
    return `${this.API_BASE_URL}/geo/1.0/direct?q=${city}&appid=${this.API_KEY}`;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.API_BASE_URL}/data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.API_KEY}`
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(city: string): Promise<Coordinates | null> {
    const response = await fetch(this.buildGeocodeQuery(city));
    const locationData = await response.json();

    if (locationData.length > 0) {
      return this.destructureLocationData(locationData[0]);
    } else {
      console.error('Location not found');
      return null;
    }
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any[]> {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    const data = await response.json();


    return data.daily;

  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    const temperature = response.current.temp;
    const wind = response.current.wind_speed;
    const humidity = response.current.humidity;

    return new Weather(temperature, wind, humidity);

  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    const forecastArray: Weather[] = weatherData.map((data) => {
      return new Weather(data.temp, data.wind_speed, data.humidity);
    });
    forecastArray.unshift(currentWeather);
    return forecastArray;

  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<Weather[]> {
    const locationData = await this.fetchAndDestructureLocationData(city);

    if (locationData) {
      const weatherDataArray = await this.fetchWeatherData(locationData);
      const currentWeather = this.parseCurrentWeather(weatherDataArray[0]);
      const forecastArray = this.buildForecastArray(currentWeather, weatherDataArray);
      return forecastArray;
    } else {
      return [];
    }
  }
}

export default new WeatherService();
