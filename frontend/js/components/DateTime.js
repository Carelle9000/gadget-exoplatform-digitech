const DateTime = {
  startDateClock(dateId, timeId) {
    function update() {
      const now = new Date();
      const dateEl = document.getElementById(dateId);
      const timeEl = document.getElementById(timeId);
      if(dateEl) {
        dateEl.textContent = now.toLocaleDateString('fr-FR');
      }
      if(timeEl) {
        timeEl.textContent = now.toLocaleTimeString('fr-FR', {hour12: false});
      }
    }
    update();
    setInterval(update, 1000);
  }
};

export default DateTime;
