/*
  SHARED STREET-PAGE RENDERER

  Future editors should normally change BRANCH_PAGE in the individual street's
  index.html, not this file. Edit this file only when every public street should
  gain the same behavior or markup.
*/

(function () {
  const config = window.BRANCH_PAGE;
  const grid = document.getElementById("destinationGrid");
  const shuffleButton = document.getElementById("shuffleButton");

  if (!config || !grid) return;

  function makeDestination(item) {
    const destination = document.createElement(item.href ? "a" : "article");
    destination.className = `destination${item.href ? "" : " is-empty"}`;
    if (item.href) destination.href = item.href;

    const kicker = document.createElement("span");
    kicker.className = "destination-kicker";
    kicker.textContent = item.kicker || (item.href ? "Open" : "Ready for content");

    const title = document.createElement("h2");
    title.textContent = item.title;

    const note = document.createElement("p");
    note.textContent = item.note;

    destination.append(kicker, title, note);
    return destination;
  }

  config.items.forEach(item => grid.append(makeDestination(item)));

  const liveItems = config.items.filter(item => item.href);
  if (shuffleButton) {
    shuffleButton.disabled = liveItems.length === 0;
    shuffleButton.addEventListener("click", () => {
      const item = liveItems[Math.floor(Math.random() * liveItems.length)];
      if (item) window.location.assign(item.href);
    });
  }
}());
