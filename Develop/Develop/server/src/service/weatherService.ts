import dotenv from 'dotenv';
dotenv.config();

// Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}

// Define a class for the Weather object
class Weather {
  temperature: number;
  windSpeed: number;
  humidity: number;

  constructor(temperature: number, windSpeed: number, humidity: number) {
    this.temperature = temperature;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}

// WeatherService class
class WeatherService {
  // Define the baseURL, API key, and city name properties
  API_BASE_URL: string;
  API_KEY: string;

  constructor() {
    this.API_BASE_URL = process.env.API_BASE_URL || 'https://api.openweathermap.org';
    this.API_KEY = process.env.API_KEY || '';

    if (!this.API_KEY) {
      throw new Error('API_KEY is required but was not set in environment variables');
    }
  }

  // Fetch location data based on city name
  private async fetchLocationData(query: string): Promise<Coordinates | null> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/geo/1.0/direct?q=${query}&appid=${this.API_KEY}`);
      
      if (!response.ok) {
        console.error('Error fetching location data:', response.statusText);
        return null;
      }
      
      const geoData = await response.json();

      if (geoData.length > 0) {
        const { lat, lon } = geoData[0];
        return { latitude: lat, longitude: lon };
      } else {
        console.error('City not found');
        return null;
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
      return null;
    }
  }

  // Build weather query for API call
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.API_BASE_URL}/data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.API_KEY}`;
  }

  // Fetch weather data based on coordinates
  private async fetchWeatherData(coordinates: Coordinates): Promise<any[]> {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    
    if (!response.ok) {
      console.error('Error fetching weather data:', response.statusText);
      return [];
    }
    
    const data = await response.json();
    return data.daily; // Assuming the 'daily' field contains forecast data
  }

  // Parse current weather from API response
  private parseCurrentWeather(response: any): Weather {
    const temperature = response.current.temp;
    const windSpeed = response.current.wind_speed;
    const humidity = response.current.humidity;

    return new Weather(temperature, windSpeed, humidity);
  }

  // Build the forecast array from current and forecast data
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    const forecastArray: Weather[] = weatherData.map((data) => {
      return new Weather(data.temp, data.wind_speed, data.humidity);
    });
    forecastArray.unshift(currentWeather); // Add current weather as the first item
    return forecastArray;
  }

  // Complete method to get weather for a city
  async getWeatherForCity(city: string): Promise<Weather[]> {
    const locationData = await this.fetchLocationData(city);

    if (locationData) {
      const weatherDataArray = await this.fetchWeatherData(locationData);
      const currentWeather = this.parseCurrentWeather(weatherDataArray[0]); // Assuming the first entry is the current weather
      const forecastArray = this.buildForecastArray(currentWeather, weatherDataArray);
      return forecastArray;
    } else {
      return [];
    }
  }
}

export default new WeatherService();
