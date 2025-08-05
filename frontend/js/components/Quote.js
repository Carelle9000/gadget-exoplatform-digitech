import { fetchQuoteOfTheDay } from '../services/quoteApi.js';

const Quote = {
  async getQuote() {
    return await fetchQuoteOfTheDay();
  },

  render(quoteElementId, authorElementId, quoteObj) {
    const quoteEl = document.getElementById(quoteElementId);
    const authorEl = document.getElementById(authorElementId);

    if (quoteEl && authorEl && quoteObj) {
      quoteEl.textContent = `"${quoteObj.text}"`;
      authorEl.textContent = quoteObj.author ? `— ${quoteObj.author}` : '—';
    }
  }
};

export default Quote;
