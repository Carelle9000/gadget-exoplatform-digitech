export async function fetchQuoteOfTheDay() {
  const url = "https://citation.lecog.fr/public/api/random-quote.php";

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erreur récupération citation (${response.status})`);

    const data = await response.json();

    // Structure uniforme { text, author }
    // Exemple de data.data.text, data.data.author.name & data.data.author.forename

    return {
      text: data.data?.text || "Rien à citer aujourd'hui.",
      author: data.data?.author ? `${data.data.author.forename} ${data.data.author.name}`.trim() : ""
    };
  } catch (error) {
    console.error("Erreur fetchQuoteOfTheDay :", error);
    // Fallback local
    return {
      text: "La vie est un défi, relève-le !",
      author: "Mère Teresa"
    };
  }
}
