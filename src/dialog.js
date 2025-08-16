import projectList from "./projectsList";
import UI from "./ui";
import "./css/dialog.css";
import { el } from "date-fns/locale";
import LocalStorage from "./localstorage";

const Dialog = (function () {
  const mainContainer = document.querySelector(".main-container");
  const dialogContainer = document.querySelector(".dialog");
  const confirmDialogContainer = document.querySelector(".confirm-dialog");
  const initialDialogContainer = document.querySelector(".initial-dialog");
  const dialogForm = document.querySelector(".dialog form");
  const initialDialogForm = document.querySelector(".initial-dialog form");
  const dialogHeadingSpan = document.querySelector(
    ".dialog .dialog-header span"
  );
  const initialDialogSpan = document.querySelector(
    ".initial-dialog .initial-dialog-header span"
  );
  const checkListScreen = document.querySelector(".check-list-screen");
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
      setDetails(mode);
    } else if (mode == "Todo" || mode == "TodoEdit") {
      dialogContainer.classList.add("for-todo");
      checkListScreen.innerHTML = /*html*/ `
            <li class="check-list-item">
              <span>Completed?</span>
              <span class="delete-from-checklist-btn">
                  <i data-lucide="trash" class="icon"></i>
              </span>
            </li>`;
      UI.refreshIcons();
      if (mode == "Todo") {
        dialogHeadingSpan.innerText = "Add New Task";
        dialogForm.dataset.id = "Todo";
      } else {
        dialogHeadingSpan.innerText = "Edit Task";
        dialogForm.dataset.id = "EditTodo";
        setDetails(mode, todoId);
        mainContainer.dataset.todoId = todoId;
      }
    }
    dialogContainer.classList.add("active");
  }
  function closeDialog() {
    dialogForm.reset();
    dialogContainer.classList.remove("active");
  }
  // function to set details
  function setDetails(mode, todoId) {
    let currData;
    if (mode == "ProjectEdit") {
      currData = projectList.getProject(mainContainer.dataset.id);
      dialogForm;
    } else {
      currData = projectList.getTodoFromProject(
        mainContainer.dataset.id,
        todoId
      );
      dialogForm.priority.value = currData.priority;
      dialogForm.dueDate.value = currData.dueDate;
      dialogForm.notes.value = currData.notes;
      checkListScreen.innerHTML = "";
      currData.checkList.forEach((checkListItem) =>
        createCheckListItem(checkListItem.task, checkListItem.done)
      );
      UI.refreshIcons();
    }
    dialogForm.title.value = currData.title;
    dialogForm.description.value = currData.description;
  }
  function addToChecklist() {
    const checkInput = document.querySelector("#dialog-check-input");
    if (checkInput.value) {
      createCheckListItem(checkInput.value, false);
      UI.refreshIcons();
      checkInput.value = "";
    }
  }
  function createCheckListItem(value, done) {
    const checkNode = document.createElement("li");
    checkNode.classList.add("check-list-item");
    const mainSpan = document.createElement("span");
    mainSpan.innerText = value;
    mainSpan.dataset.done = done;
    checkNode.append(mainSpan);
    const deleteCheckBtn = document.createElement("span");
    deleteCheckBtn.classList.add("delete-from-checklist-btn");
    deleteCheckBtn.innerHTML += "<i data-lucide='trash' class='icon'></i>";
    checkNode.append(deleteCheckBtn);
    checkListScreen.append(checkNode);
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
    const checkList = document.querySelectorAll(
      ".check-list-item span:first-child"
    );
    let mode = dialogForm.dataset.id;
    const formData = new FormData(dialogForm);
    const data = Object.fromEntries(formData.entries());
    data.checkList = [];
    if (checkList.length < 1) {
      data.checkList.push({ task: "Completed?", done: false });
    }
    checkList.forEach((element) => {
      data.checkList.push({
        task: element.innerText,
        done: element.dataset.done == "true" ? true : false,
      });
    });
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
  function renderConfirmDialog(mode, id) {
    confirmDialogContainer.dataset.id = mode;
    confirmDialogContainer.dataset.todoId = id;
    confirmDialogContainer.classList.add("active");
  }
  //function to handle confirm
  function handleConfirm() {
    const currId = mainContainer.dataset.id;
    const mode = confirmDialogContainer.dataset.id;
    const id = confirmDialogContainer.dataset.todoId;
    if (mode == "ProjectDelete") {
      UI.handleSectionChange("dashboard");
      projectList.deleteProject(currId);
      UI.renderNavbarList();
    } else if (mode == "TodoDelete") {
      projectList.deleteTodoFromProject(currId, id);
      UI.renderSection(mainContainer.dataset.id);
    }
    closeConfirmDialog();
  }
  // Function to close confirm dialog
  function closeConfirmDialog() {
    confirmDialogContainer.classList.remove("active");
  }
  // Function to render initial dialog
  function renderInitialDialog(mode) {
    if (!LocalStorage.getName()) {
      initialDialogSpan.innerText = UI.getGreeting();
      initialDialogContainer.classList.add("active");
    } else if (mode == "EditName") {
      initialDialogSpan.innerText = "Edit Name";
      initialDialogForm.name.value = LocalStorage.getName();
      initialDialogContainer.classList.add("active");
    } else {
      UI.renderSection("dashboard");
    }
  }
  // Function to handle initial dialog submit
  function handleInitialDialogSubmit(e) {
    e.preventDefault();
    const formData = new FormData(initialDialogForm);
    const data = Object.fromEntries(formData.entries());
    if (data.name != "" && data.name) {
      LocalStorage.setName(data.name);
      UI.renderSection("dashboard");
      initialDialogContainer.classList.remove("active");
    }
  }
  return {
    renderDialog,
    closeDialog,
    renderConfirmDialog,
    closeConfirmDialog,
    handleSubmit,
    addToChecklist,
    handleConfirm,
    renderInitialDialog,
    handleInitialDialogSubmit,
  };
})();
export default Dialog;
