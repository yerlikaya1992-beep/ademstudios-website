/* Project compass: local-only interactions, no analytics, requests or storage. */
(() => {
  "use strict";
  const root = document.getElementById("kompass");
  if (!root) return;
  const choices = Array.from(root.querySelectorAll("[data-compass-select]"));
  const panels = Array.from(root.querySelectorAll("[data-compass-panel]"));
  const announce = root.querySelector("[data-compass-announcement]");
  const names = {
    kuran: "Kuran Lern-App",
    familie: "Familienreise",
    vehicle: "Vehicle Dispatch"
  };
  function chooseProject(id) {
    if (!Object.prototype.hasOwnProperty.call(names, id)) return;
    choices.forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.compassSelect === id));
    });
    panels.forEach(panel => {
      panel.hidden = panel.dataset.compassPanel !== id;
    });
    if (announce) announce.textContent = names[id] + " ausgewählt.";
  }
  choices.forEach((button, index) => {
    button.addEventListener("click", () => chooseProject(button.dataset.compassSelect));
    button.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const target = choices[(index + direction + choices.length) % choices.length];
      target.focus();
      chooseProject(target.dataset.compassSelect);
    });
  });
  const demoImage = root.querySelector("#compass-demo-screen");
  const shotButtons = Array.from(root.querySelectorAll("[data-vehicle-shot]"));
  const shots = {
    orders: {
      src: "/assets/vehicle-demo/vehicle-orders-desktop.png",
      alt: "Demo-Screenshot: Vehicle Dispatch, Übersicht über künstliche Fahrzeugaufträge"
    },
    request: {
      src: "/assets/vehicle-demo/vehicle-request-desktop.png",
      alt: "Demo-Screenshot: Vehicle Dispatch, Anfragen mit künstlichen Kunden- und Auftragsdaten"
    }
  };
  function showShot(name) {
    const shot = shots[name];
    if (!shot || !demoImage) return;
    demoImage.src = shot.src;
    demoImage.alt = shot.alt;
    shotButtons.forEach(button =>
      button.setAttribute("aria-pressed", String(button.dataset.vehicleShot === name))
    );
    if (announce) announce.textContent = "Demoansicht " + (name === "orders" ? "Aufträge" : "Anfragen") + " geöffnet.";
  }
  shotButtons.forEach(button => button.addEventListener("click", () => showShot(button.dataset.vehicleShot)));
})();