import { fetchRecentDocuments } from '../services/docsApi.js';

const RecentDocs = {
  async getRecentDocuments(userId) {
    const docs = await fetchRecentDocuments(userId);
    return docs || [];
  },

  render(elementId, documents) {
    const ul = document.getElementById(elementId);
    if(!ul) return;

    ul.innerHTML = ''; // reset
    if(documents.length === 0){
      ul.innerHTML = '<li>Aucun document récent.</li>';
      return;
    }
    documents.forEach(doc => {
      const li = document.createElement('li');
      li.className = 'py-1';
      li.textContent = `${doc.title} — ${new Date(doc.modifiedDate).toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})} ${new Date(doc.modifiedDate).toLocaleDateString('fr-FR')}`;
      ul.appendChild(li);
    });
  }
};

export default RecentDocs;
