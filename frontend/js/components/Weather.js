// Weather.js
import { fetchWeather } from '../services/weatherApi.js'; 

const Weather = {
  async getUserLocation() {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        // Fallback à Douala si la géolocalisation n'est pas supportée
        resolve({ latitude: 4.05, longitude: 9.7 });
      } else {
        // Timeout manuel possible pour éviter blocage long
        const GEO_TIMEOUT = 10000; // 10 sec
        let didRespond = false;
        const timeoutId = setTimeout(() => {
          if (!didRespond) {
            didRespond = true;
            console.warn("Timeout géoloc, fallback à Douala.");
            resolve({ latitude: 4.05, longitude: 9.7 });
          }
        }, GEO_TIMEOUT);

        navigator.geolocation.getCurrentPosition(
          position => {
            if (!didRespond) {
              clearTimeout(timeoutId);
              didRespond = true;
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              });
            }
          },
          error => {
            if (!didRespond) {
              clearTimeout(timeoutId);
              didRespond = true;
              console.warn("Erreur géoloc:", error.message);
              resolve({ latitude: 4.05, longitude: 9.7 });
            }
          },
          { timeout: GEO_TIMEOUT, enableHighAccuracy: false }
        );
      }
    });
  },

  async getWeather(lat, lon) {
    try {
      const weatherData = await fetchWeather(lat, lon);
      return weatherData;
    } catch (error) {
      console.error("Erreur lors de la récupération des données météo:", error);
      throw error; // Rejeter l'erreur pour gestion en appelant
    }
  },

  
  render(cityElementId, tempElementId, descElementId, errorElementId, weatherData, errorMessage = '') {
    const cityElement = document.getElementById(cityElementId);
    const tempElement = document.getElementById(tempElementId);
    const descElement = document.getElementById(descElementId);
    const errorElement = document.getElementById(errorElementId);

    if (weatherData) {
      if (cityElement) cityElement.textContent = weatherData.city || '';
      if (tempElement) tempElement.textContent = weatherData.temp !== undefined ? `${weatherData.temp}°C` : '';
      if (descElement) descElement.textContent = weatherData.description || '';
    } else {
      if (cityElement) cityElement.textContent = '';
      if (tempElement) tempElement.textContent = '';
      if (descElement) descElement.textContent = '';
    }

    if (errorElement) {
      errorElement.textContent = errorMessage;
    }
  }
};

export default Weather;
