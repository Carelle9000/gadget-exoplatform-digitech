import { getUserInfo } from '../services/userApi.js';

const WelcomeMessage = {
  // Charge les infos utilisateur depuis l'API
  async loadUser() {
    const user = await getUserInfo();
    return user || { id: '', fullName: 'Utilisateur' };
  },

  // Affiche le message de bienvenue personnalisé dans l'élément spécifié
  render(elementId, user) {
    const el = document.getElementById(elementId);
    if (el && user && user.fullName) {
      el.textContent = `Bonjour, ${user.fullName} ! 👋`;
    }
  },

  // Affiche le sous-texte d'accueil, avec gestion de texte multi-lignes claire
  renderSubtext(elementId = 'welcome-subtext') {
    const el = document.getElementById(elementId);
    if (el) {
      el.textContent = `Bienvenue sur votre espace collaboratif DigiTech.
    Que cette journée soit riche en échanges et en réussites !`;
    }
  }
};

export default WelcomeMessage;
