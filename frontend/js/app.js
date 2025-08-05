import WelcomeMessage from './components/WelcomeMessage.js';
import Quote from './components/Quote.js';
import Weather from './components/Weather.js';
import DateTime from './components/DateTime.js';
import RecentDocs from './components/RecentDocs.js';

async function initDashboard() {
  try {
    // Démarrer la mise à jour durée réelle de la date et heure
    DateTime.startDateClock('current-date', 'current-time');

    // Chargement utilisateur + affichage
    const user = await WelcomeMessage.loadUser();
    WelcomeMessage.render('welcome-msg', user);
    WelcomeMessage.renderSubtext('welcome-subtext');

    // Charger et afficher la citation
    const quoteObj = await Quote.getQuote();
    Quote.render('quote', 'quote-author', quoteObj);

    // Charger la météo avec gestion complète erreur / fallback
    try {
      const { latitude, longitude } = await Weather.getUserLocation();
      const weatherData = await Weather.getWeather(latitude, longitude);

      // Injection dans le HTML avec les bons IDs (température, ville, description, erreur)
      Weather.render(
        'city-name',
        'temperature',
        'description',
        'error-message',
        weatherData,
        '' // Pas d'erreur ici
      );
    } catch (weatherError) {
      console.error("Impossible d'afficher la météo:", weatherError);
      Weather.render(
        'city-name',
        'temperature',
        'description',
        'error-message',
        null,              // Pas de données météo
        `Erreur: ${weatherError.message}. Impossible de charger la météo.`
      );
    }

    // Documents récents
    const docs = await RecentDocs.getRecentDocuments(user.id);
    RecentDocs.render('docs-list', docs);

    // Ajouter la classe fade-in au container principal une fois tout chargé
    const gadget = document.getElementById('gadget-dashboard');
    if (gadget) {
      gadget.classList.add('fade-in');
    }

  } catch (error) {
    console.error('Erreur lors de l\'initialisation du dashboard:', error);
    const container = document.querySelector('#gadget-dashboard');
    if (container) {
      container.innerHTML = `
        <p class="text-center text-red-600 font-semibold my-6">
          Erreur lors du chargement du gadget : ${error.message}
        </p>`;
    }
  }
}

// Lancer l'initialisation une seule fois après que le DOM soit prêt
window.addEventListener('DOMContentLoaded', () => {
  initDashboard();
});
