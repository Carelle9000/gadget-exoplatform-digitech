import { getUserInfo } from '../services/userApi.js';


const WelcomeMessage = {
  async loadUser() {
    const user = await getUserInfo();
    return user || { id: '', fullName: 'Utilisateur' };
  },

  render(elementId, user) {
    const el = document.getElementById(elementId);
    if (el && user && user.fullName) {
      el.textContent = `Bonjour, ${user.fullName} ! 👋`;

      // Ajout de l’animation fade-in-up
      el.classList.add('fade-in-up');

      // (optionnel) enlever la classe après animation pour permettre replay (ex: au rafraîchissement)
      el.addEventListener('animationend', () => {
        el.classList.remove('fade-in-up');
      }, { once: true });
    }
  },

  renderSubtext(elementId = 'welcome-subtext') {
    const el = document.getElementById(elementId);
    if (el) {
      el.textContent = `Bienvenue sur votre espace collaboratif DigiTech.
Que cette journée soit riche en échanges et en réussites !`;

      // Même animation pour le sous-texte, un peu décalée dans le temps
      el.classList.add('fade-in-up');
      el.style.animationDuration = '1.5s';

      el.addEventListener('animationend', () => {
        el.classList.remove('fade-in-up');
        el.style.animationDuration = null;
      }, { once: true });
    }
  }
};

export default WelcomeMessage;
