import projectList from "./projectsList.js";
import renderDashboard from "./components/dashboard.js";
import renderProject from "./components/project.js";
// Importing Icons
import {
  createIcons,
  Bolt,
  SquarePen,
  Trash,
  Plus,
  Trash2,
  Menu,
  LaptopMinimalCheck,
  CalendarClock,
  ListTodo,
  CalendarCheck2,
  LayoutDashboard,
  OctagonAlert,
  X,
} from "lucide";

const UI = (() => {
  // DOM Variables
  const mainContainer = document.querySelector(".main-container");
  const navbarList = document.querySelector(".navbar-projects-list");

  // Rendering Navbar Projects
  function renderNavbarList() {
    navbarList.innerHTML = "";
    const data = projectList.getProjectList();
    data.forEach((project) => {
      const listElement = document.createElement("li");
      listElement.classList.add("navbar-projects-item");
      listElement.dataset.nav = project.id;
      listElement.innerText = project.title;
      navbarList.appendChild(listElement);
    });
    document
      .querySelector(`[data-nav="${mainContainer.dataset.id}"]`)
      .classList.add("active-section");
  }
  // Function to handleChangeOfSection
  function handleSectionChange(id) {
    const currActiveSection = document.querySelector(".active-section");
    if (currActiveSection.dataset.nav != id) {
      const toActiveSection = document.querySelector(`[data-nav="${id}"]`);
      currActiveSection.classList.remove("active-section");
      toActiveSection.classList.add("active-section");
      mainContainer.dataset.id = id;
      renderSection(id);
      changeNavbar();
    } else {
      changeNavbar();
    }
  }
  // function for rendering appropriate section
  function renderSection(currId) {
    if (currId == "dashboard") renderDashboard();
    else if (currId == "today") console.log("pokemon");
    else if (currId == "upcoming") console.log("pokemon");
    else if (currId == "completed") console.log("pokemon");
    else renderProject(currId);
    createIcons({
      icons: {
        Bolt,
        SquarePen,
        Trash,
        Plus,
        Trash2,
        Menu,
        LaptopMinimalCheck,
        CalendarClock,
        ListTodo,
        CalendarCheck2,
        LayoutDashboard,
        OctagonAlert,
        X,
      },
    });
  }
  // function to change navbar
  function changeNavbar() {
    mainContainer.classList.toggle("navbar-changed");
  }
  return {
    renderNavbarList,
    handleSectionChange,
    renderSection,
    changeNavbar,
  };
})();
export default UI;
