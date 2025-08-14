import projectList from "./projectsList";
import UI from "./ui";
import "./css/dialog.css";

const Dialog = (function () {
  const mainContainer = document.querySelector(".main-container");
  const dialogContainer = document.querySelector(".dialog");
  const confirmDialogContainer = document.querySelector(".confirm-dialog");
  const dialogForm = document.querySelector(".dialog form");
  const dialogHeadingSpan = document.querySelector(
    ".dialog .dialog-header span"
  );
  const confirmBtn = document.querySelector(".confirm-btn");
  // Function to render Form dialog
  function renderDialog(mode, todoId) {
    dialogContainer.classList.remove("for-todo");
    mainContainer.dataset.todoId = "";
    setInputDate();
    if (mode === "Project") {
      dialogHeadingSpan.innerText = "Add New Project";
      dialogForm.dataset.id = "Project";
    } else if (mode == "ProjectEdit") {
      dialogHeadingSpan.innerText = "Edit Project Details";
      dialogForm.dataset.id = "ProjectEdit";
    } else if (mode == "Todo" || mode == "TodoEdit") {
      dialogContainer.classList.add("for-todo");
      if (mode == "Todo") {
        dialogHeadingSpan.innerText = "Add New Todo";
        dialogForm.dataset.id = "Todo";
      } else {
        dialogHeadingSpan.innerText = "Edit Todo";
        dialogForm.dataset.id = "EditTodo";
        mainContainer.dataset.todoId = todoId;
      }
    }
    dialogContainer.classList.add("active");
  }
  function closeDialog() {
    dialogContainer.classList.remove("active");
  }
  // function to set current date in input type date
  function setInputDate() {
    const dateInput = document.getElementById("dialog-date");
    const today = new Date().toISOString().split("T")[0];
    dateInput.value = today;
  }
  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    let mode = dialogForm.dataset.id;
    const formData = new FormData(dialogForm);
    const data = Object.fromEntries(formData.entries());
    if (data.title.length >= 5 && data.description.length >= 10) {
      if (mode == "Project") {
        projectList.addProject(data);
        UI.renderNavbarList();
      } else if (mode == "ProjectEdit") {
        projectList.editProject(mainContainer.dataset.id, data);
        UI.renderSection(mainContainer.dataset.id);
        UI.renderNavbarList();
      } else if (mode == "Todo") {
        projectList.addTodoInProject(mainContainer.dataset.id, data);
        UI.renderSection(mainContainer.dataset.id);
      } else {
        projectList.editTodoInProject(
          mainContainer.dataset.id,
          mainContainer.dataset.todoId,
          data
        );
        UI.renderSection(mainContainer.dataset.id);
      }
      dialogForm.reset();
      closeDialog();
    }
  }
  // Function to Handle confirm dialog
  function handleConfirmDialog([mode, id]) {
    confirmBtn.addEventListener("click", () => {
      const currId = mainContainer.dataset.id;
      if (mode == "ProjectDelete") {
        UI.handleSectionChange("dashboard");
        projectList.deleteProject(currId);
        UI.renderNavbarList();
      } else if (mode == "TodoDelete") {
        projectList.deleteTodoFromProject(currId, id);
        UI.renderSection(mainContainer.dataset.id);
      }
      closeConfirmDialog();
    });
    confirmDialogContainer.classList.add("active");
  }
  // Function to close confirm dialog
  function closeConfirmDialog() {
    confirmDialogContainer.classList.remove("active");
  }
  return {
    renderDialog,
    closeDialog,
    handleConfirmDialog,
    closeConfirmDialog,
    handleSubmit,
  };
})();
export default Dialog;
