import Events from "../events";

(() => {
  const contentContainer = document.querySelector(".content");
  function renderDashboard() {
    contentContainer.innerText = "Dashboard";
  }
  Events.on("render:dashboard", renderDashboard);
})();
