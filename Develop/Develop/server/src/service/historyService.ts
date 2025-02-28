import * as fs from 'fs/promises';

// Define a City class with name and id properties
class City {
  name: string;
  state: string;
  country: string;
  fiveDayForecast: Array<{ date: string; weather: string; temperature: number; windSpeed: number; humidity: number }>;

  constructor(
    name: string,
    state: string,
    country: string,
    fiveDayForecast: Array<{ date: string, weather: string, temperature: number, windSpeed: number, humidity: number }>
  ) {
    this.name = name;
    this.state = state;
    this.country = country;
    this.fiveDayForecast = fiveDayForecast;
  }
}

// Complete the HistoryService class
class HistoryService {
  private filePath = '../../../db/searchHistory.json'; // Consistent path for file

  // Define a read method that reads from the searchHistory.json file
  private async read(): Promise<any> {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading search history:', error);
      throw error;
    }
  }

  // Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    try {
      const data = JSON.stringify(cities, null, 2);
      await fs.writeFile(this.filePath, data, 'utf8');
    } catch (error) {
      console.error('Error writing to search history:', error);
      throw error;
    }
  }

  // Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    try {
      const cities: City[] = await this.read();
      return cities;
    } catch (error) {
      console.error('Error reading cities:', error);
      throw error;
    }
  }

  // Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    try {
      const cities = await this.getCities(); // Use getCities to avoid code duplication
      const newCity = new City(city, 'Unknown', 'Unknown', []); // Assuming 'Unknown' for state and country for now
      cities.push(newCity);
      await this.write(cities);
    } catch (error) {
      console.error('Error adding city:', error);
    }
  }

  // BONUS: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    try {
      const cities = await this.getCities();
      const updatedHistory = cities.filter(city => city.id !== id);
      await this.write(updatedHistory);
    } catch (error) {
      console.error('Error removing city:', error);
    }
  }
}

export default new HistoryService();
