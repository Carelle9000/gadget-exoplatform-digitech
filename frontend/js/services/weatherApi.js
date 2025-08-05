export async function fetchWeather(lat, lon) {
  const apiKey = '7809207d759d45941eb5ce1b2903a8ca';
  // L'URL correcte avec la clé API comme paramètre 'appid'
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=fr`;

  try {
    const resp = await fetch(url);

    if (!resp.ok) {
      // Gérer les erreurs HTTP (ex: 401 pour clé invalide, 404 pour ville non trouvée)
      const errorData = await resp.json();
      throw new Error(`Erreur API: ${resp.status} - ${errorData.message || 'Quelque chose s\'est mal passé'}`);
    }

    const data = await resp.json();

    return {
      temp: Math.round(data.main.temp),
      city: data.name,
      description: data.weather && data.weather[0] ? data.weather[0].description : "Indisponible"
    };
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API OpenWeatherMap:", error);
    throw error; // Propage l'erreur
  }
}