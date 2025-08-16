import projectList from "./projectsList.js";
import renderDashboard from "./components/dashboard.js";
import renderProject from "./components/project.js";
import { getHours } from "date-fns";
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
    const data = projectList.getProjectList().toReversed();
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
    else renderProject(currId);
    refreshIcons();
  }
  // function to refresh icons
  function refreshIcons() {
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
  // function to get greeting
  function getGreeting() {
    const hour = getHours(new Date());

    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 17) {
      return "Good Afternoon";
    } else if (hour < 21) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  }
  return {
    renderNavbarList,
    handleSectionChange,
    renderSection,
    changeNavbar,
    refreshIcons,
    getGreeting,
  };
})();
export default UI;
