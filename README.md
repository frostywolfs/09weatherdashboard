# 09weatherdashboard

## Overview

The **Weather Dashboard** is a web application that retrieves and displays weather data by consuming the **OpenWeather API**. By making HTTP requests to OpenWeather's API, the dashboard provides users with current weather conditions, including temperature, humidity, wind speed, and forecasts for different cities. 

This application demonstrates how to interact with external APIs by sending requests with specific parameters to fetch and display data dynamically in the browser.

## Challenge

The goal of this project is to build a weather dashboard that:

1. Calls the OpenWeather API to retrieve real-time weather data.
2. Displays the weather information in a user-friendly format.
3. Allows users to search for weather data by entering a city name.
4. Renders weather details, including temperature, humidity, and wind speed.
5. Optionally stores search history for quick access to previously searched cities.

## Key Features

- **City Search**: Users can search for the current weather of any city.
- **Current Weather**: Displays temperature, humidity, wind speed, and other weather details for the selected city.
- **Weather Forecast**: Shows a 5-day weather forecast for the selected city.
- **Search History**: Stores a history of previously searched cities for easy access.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend** (if applicable): Node.js (for managing API requests)
- **External API**: OpenWeather API

## Getting Started

To use this application, you'll need to sign up for an API key from OpenWeather and configure your environment accordingly.

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/frostywolfs/09weatherdashboard.git
2. Install the necessary dependencies:
    ```bash
    npn install
3. Create a .env file in the project root with your OpenWeather API key:
    ```ini
    API_KEY=your_openweather_api_key
4. Run the Application
    ```bash
    npm start

## API Documentation
-OpenWeather API: OpenWeather API Documentation(https://openweathermap.org/forecast5)
