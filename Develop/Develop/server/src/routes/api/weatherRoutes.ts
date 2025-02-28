import { Router, type Request, type Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
import { get } from 'http';
import historyService from '../../service/historyService.js';

const router = Router();

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  const { city } = req.body;

  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  } 
  try {
    const weatherData = await WeatherService.getWeatherForCity(city);
    await historyService.addCity(city);
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve weather data or save city' });
  } 
  
  // TODO: GET weather data from city name
  // TODO: save city to search history
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {
  try {
    const history = await HistoryService.getCities();
    res.json(history);
  } catch (error) { 
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve search history' });

  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await HistoryService.removeCity(id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete history' })
  }
});

export default router;
