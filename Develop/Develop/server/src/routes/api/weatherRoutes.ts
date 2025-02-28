import { Router, type Request, type Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();

// POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  const { city } = req.body;

  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    const weatherData = await WeatherService.getWeatherForCity(city);
    await HistoryService.addCity(city);  // Use the consistent name for HistoryService
    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data or saving city:', error);
    res.status(500).json({ error: 'Failed to retrieve weather data or save city' });
  }

  // TODO: GET weather data from city name
  // TODO: save city to search history
});

// GET search history
router.get('/history', async (req: Request, res: Response) => {
  try {
    const history = await HistoryService.getCities();
    res.json(history);
  } catch (error) {
    console.error('Error fetching search history:', error);
    res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});

// BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await HistoryService.removeCity(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting city from history:', error);
    res.status(500).json({ error: 'Failed to delete history' });
  }
});

export default router;
