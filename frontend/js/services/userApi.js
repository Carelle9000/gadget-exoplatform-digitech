/*export async function getUserInfo() {
  try {
    const response = await fetch('/v1/social/identities/{id}', { credentials: 'include' });
    if (!response.ok) throw new Error('Erreur récupération utilisateur');
    return await response.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}*/
export async function getUserInfo() {
  return {
    id: "123",
    fullName: "Jean Dupont"
  };
}
