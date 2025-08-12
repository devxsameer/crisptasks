import Events from "./events";

const dialog = (() => {
  const dialogContainer = document.querySelector(".dialog");
  const confirmDialogContainer = document.querySelector(".confirm-dialog");
  const mainContainer = document.querySelector(".main-container");
  const dialogForm = document.querySelector(".dialog form");
  const dialogHeadingSpan = document.querySelector(
    ".dialog .dialog-header span"
  );
  const confirmBtn = document.querySelector(".confirm-btn");
  const dashboardNavbarBtn = document.querySelector("[data-id='dashboard']");
  // Function to handle Form dialog
  function renderDialog(mode) {
    dialogContainer.classList.remove("for-todo");
    setInputDate();
    if (mode === "Project") {
      dialogHeadingSpan.innerText = "Add New Project";
    } else if (mode == "Todo") {
      dialogHeadingSpan.innerText = "Add New Todo";
      dialogContainer.classList.add("for-todo");
    }
    dialogForm.addEventListener("submit", (e) => {
      handleSubmit(e, mode);
    });
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
  function handleSubmit(e, mode) {
    e.preventDefault();
    const formData = new FormData(dialogForm);
    const data = Object.fromEntries(formData.entries());
    if (data.title.length >= 5 && data.description.length >= 10) {
      if (mode == "Project") {
        Events.emit("project:added", data);
      } else if (mode == "Todo") {
        Events.emit("project:todo:added", [mainContainer.dataset.id, data]);
        Events.emit("section:to:refresh");
      }
      dialogForm.reset();
      closeDialog();
    }
  }
  // Function to handle confirm dialog
  function renderConfirmDialog([mode, id]) {
    confirmBtn.addEventListener("click", () => {
      const currId = mainContainer.dataset.id;
      if (mode == "ProjectDelete") {
        Events.emit("section:to:change", "dashboard");
        Events.emit("project:deleted", currId);
      } else {
        Events.emit("project:todo:deleted", [currId, id]);
        Events.emit("section:to:refresh");
      }
      closeConfirmDialog();
    });
    confirmDialogContainer.classList.add("active");
  }
  // Function to close confirm dialog
  function closeConfirmDialog() {
    confirmDialogContainer.classList.remove("active");
  }
  Events.on("dialog:form:open", renderDialog);
  Events.on("dialog:form:close", closeDialog);
  Events.on("dialog:confirm:open", renderConfirmDialog);
  Events.on("dialog:confirm:close", closeConfirmDialog);
})();
