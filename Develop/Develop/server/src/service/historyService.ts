import { promises } from 'dns';
import * as fs from 'fs/promises';
// TODO: Define a City class with name and id properties
class City {
  name: string;
  state: string;
  country: string;
  fiveDayForecast: Array<{ date: string; weather: string; temperature: number; windSpeed: number; humidity: number }>;

  constructor(
    name: string, 
    state: string, 
    country: string, 
    fiveDayForecast: Array<{ date: string, weather: string, temperature: number, windSpeed: number, humidity: number }>) {
      this.name = name;
      this.state = state;
      this.country = country;
      this.fiveDayForecast = fiveDayForecast;
    }
}

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read(): Promise<any> {
    try {
      const data = await fs.readFile('../../../db/searchHistory.json', 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading search history:', error);
      throw error;
    }
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    try {
      const data = JSON.stringify(cities, null, 2);

      await fs.writeFile('../../../db/searchHistory.json', data, 'utf8');
    } catch (error) {
      console.error('Error writing to search history:', error);
      throw error;
    }
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    try {
      const data = await fs.readFile('../../../db/searchHistory.json', 'utf8');
      const cities: City[] = JSON.parse(data);
      return cities 
    } catch (error) {
      console.error('Error reading cities:', error);
      throw error
    }
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    try {
      const data = await fs.readFile('searchHistory.json', 'utf8');
      const searchHistory = JSON.parse(data);

      const newCity = {
        id: Date.now().toString(),
        name: city
      };

      searchHistory.push(newCity);
      await this.write(searchHistory);
    } catch (error) {
      console.error('Error adding city:', error);

    }
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    try {
      const data = await fs.readFile('searchHistory.json', 'utf8');
      const searchHistory: { id: string; name: string }[] = JSON.parse(data);

      const updatedHistory = searchHistory.filter(city => city.id !== id);

      await fs.writeFile('searchHistory.json', JSON.stringify(updatedHistory, null, 2));
    } catch (error) {
      console.error('Error removing city:', error);
    }
  }
}

export default new HistoryService();
