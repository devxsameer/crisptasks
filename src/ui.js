import Events from "./events";
import "./dialog.js";
import "./pages/project.js";
import "./pages/dashboard.js";

const UI = (() => {
  // DOM Variables
  const mainContainer = document.querySelector(".main-container");
  const navbarList = document.querySelector(".navbar-projects-list");

  // Rendering Navbar Projects
  function renderNavbarList(data) {
    navbarList.innerHTML = "";
    data.forEach((project) => {
      const listElement = document.createElement("li");
      listElement.classList.add("navbar-projects-item");
      listElement.setAttribute("data-id", project.id);
      listElement.innerText = project.title;
      navbarList.appendChild(listElement);
    });
  }
  // Function to handleChangeOfSection
  function handleSectionChange(id) {
    const currActiveSection = document.querySelector(".active-section");
    if (currActiveSection.dataset.id != id) {
      const toActiveSection = document.querySelector(`[data-id="${id}"]`);
      toActiveSection.classList.add("active-section");
      currActiveSection.classList.remove("active-section");
      mainContainer.setAttribute("data-id", id);
      renderRespectiveSection(id);
      Events.emit("navbar:to:change");
    }
  }
  // function for rendering appropriate section
  function renderRespectiveSection(currId = mainContainer.dataset.id) {
    if (currId == "dashboard") {
      Events.emit("render:dashboard");
    } else if (currId == "today") {
      Events.emit("render:today");
    } else if (currId == "upcoming") {
      Events.emit("render:upcoming");
    } else if (currId == "completed") {
      Events.emit("render:completed");
    } else {
      Events.emit("render:project", currId);
    }
  }
  Events.on("section:to:change", handleSectionChange);
  Events.on("section:to:refresh", renderRespectiveSection);
  Events.on("projects:changed", renderNavbarList);
  Events.on("navbar:to:change", () => {
    mainContainer.classList.toggle("navbar-changed");
  });
})();
