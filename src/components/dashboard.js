import LocalStorage from "../localstorage";
import UI from "../ui";
import "../css/dashboard.css";
import { format } from "date-fns";
const renderDashboard = function () {
  const contentContainer = document.querySelector(".content");
  contentContainer.innerHTML = /*html*/ `
      <div class="dashboard">
        <div class="dashboard-main">
          <div class="dashboard-header">
            <span>
              Dashboard
            </span>
            <div class="btns">
              <span class="dashboard-settings">
                  <i data-lucide="bolt"></i>
              </span>
            </div>
          </div>
          <div class="dashboard-content">
            <div class="dashboard-heading">
              <h3>
                ${UI.getGreeting()}, 
                <span>${LocalStorage.getName()}</span>
              </h3>
              <p>${format(new Date(), "'Today,' EEEE dd MMMM yyyy")}</p>
            </div>
          </div>
        </div>
        <div class="dashboard-footer">
          <span>Made with &hearts; by <a href="https://github.com/devxsameer" target="_blank" rel="noopener noreferrer">@devxsameer</a></span>
        </div>
      </div>
  `;
};
export default renderDashboard;
