// Importing CSS
import "./css/style.css";
import "./css/content.css";
// Importing ESM
import projectList from "./projectsList.js";
import UI from "./ui.js";
import Dialog from "./dialog.js";
import TodoDetails from "./components/todo.js";

// DOM Load Events
window.addEventListener("DOMContentLoaded", () => {
  //  DOM Variables
  const dialogBox = document.querySelector(".dialog-box");
  const confirmDialogBox = document.querySelector(".confirm-dialog-box");
  const dialogForm = document.querySelector(".dialog form");
  // Loading data
  projectList.setProjectsList();
  UI.renderNavbarList(projectList.getProjectList());
  UI.renderSection("dashboard");
  // Adding Event Listeners
  dialogForm.addEventListener("submit", (e) => {
    Dialog.handleSubmit(e);
  });
  document.body.addEventListener("click", (e) => {
    // on clicking hamburger
    if (e.target.closest(".hamburger")) UI.changeNavbar();
    // on clicking cancel btn or outer area
    if (!dialogBox.contains(e.target) || e.target.closest(".cancel-btn"))
      Dialog.closeDialog();
    if (!confirmDialogBox.contains(e.target) || e.target.closest(".cancel-btn"))
      Dialog.closeConfirmDialog();
    // for rendering dialog
    if (e.target.closest(".create-new-btn")) Dialog.renderDialog("Project");
    if (e.target.closest(".add-new-todo")) Dialog.renderDialog("Todo");
    // for rendering confirm dialog
    if (e.target.closest(".project-delete"))
      Dialog.handleConfirmDialog(["ProjectDelete", null]);
    if (e.target.closest(".todo-delete-btn"))
      Dialog.handleConfirmDialog([
        "TodoDelete",
        e.target.closest(".todo-delete-btn").dataset.id,
      ]);
    // for changing section
    if (e.target.closest(".navbar-projects-item"))
      UI.handleSectionChange(
        e.target.closest(".navbar-projects-item").dataset.nav
      );
    if (e.target.closest(".navbar-func-item"))
      UI.handleSectionChange(e.target.closest(".navbar-func-item").dataset.nav);
    // for rendering todo in separate section
    if (e.target.closest(".project-todo[data-id]")) {
      if (!e.target.closest(".todo-delete-btn"))
        TodoDetails.renderDetails(
          e.target.closest(".project-todo[data-id]").dataset.id
        );
    }
    if (e.target.closest(".details-close-btn")) TodoDetails.clearDetails();
  });
});
