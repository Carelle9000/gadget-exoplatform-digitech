/*export async function fetchRecentDocuments(userId) {
  try {
    // L'API pourrait gérer le userId automatiquement via session
    const response = await fetch(`/rest/private/v1/documents/recent?userId=${userId}`, { credentials: 'include' });
    if (!response.ok) throw new Error('Erreur récupération documents');
    return await response.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}
*/
export async function fetchRecentDocuments(userId) {
  return [
    { id: "1", title: "Présentation.pdf", modifiedDate: "2025-07-31T09:40:00" },
    { id: "2", title: "Cahier.doc", modifiedDate: "2025-07-31T19:40:00" },
    { id: "3", title: "Statistiques.xls", modifiedDate: "2025-07-31T09:40:00" }
  ];
}
