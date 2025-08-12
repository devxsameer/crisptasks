// Importing CSS
import "./css/style.css";
import "./css/content.css";
import "./css/dialog.css";
// Importing ESM
import Events from "./events.js";
import "./icons.js";
import "./classes.js";
import "./localstorage.js";
import "./projectsList.js";
import "./ui.js";
// DOM Load Events
window.addEventListener("DOMContentLoaded", () => {
  //  DOM Variables
  const dialogBox = document.querySelector(".dialog-box");
  const confirmDialogBox = document.querySelector(".confirm-dialog-box");
  // Adding Event Listeners
  Events.emit("document:loaded");
  Events.emit("section:to:refresh");
  document.body.addEventListener("click", (e) => {
    if (!dialogBox.contains(e.target) || e.target.closest(".cancel-btn")) {
      Events.emit("dialog:form:close");
    }
    if (
      !confirmDialogBox.contains(e.target) ||
      e.target.closest(".cancel-btn")
    ) {
      Events.emit("dialog:confirm:close");
    }
    if (e.target.closest(".hamburger")) {
      Events.emit("navbar:to:change");
    }
    if (e.target.closest(".create-new-btn")) {
      Events.emit("dialog:form:open", "Project");
    }
    if (e.target.closest(".add-new-todo")) {
      Events.emit("dialog:form:open", "Todo");
    }
    if (e.target.closest(".project-delete")) {
      Events.emit("dialog:confirm:open", ["ProjectDelete"]);
    }
    if (e.target.closest(".todo-delete-btn")) {
      Events.emit("dialog:confirm:open", [
        "TodoDelete",
        e.target.closest(".todo-delete-btn").dataset.id,
      ]);
    }
    if (e.target.closest(".navbar-projects-item")) {
      Events.emit(
        "section:to:change",
        e.target.closest(".navbar-projects-item").dataset.id
      );
    }
    if (e.target.closest(".navbar-func-item")) {
      Events.emit(
        "section:to:change",
        e.target.closest(".navbar-func-item").dataset.id
      );
    }
  });
});
