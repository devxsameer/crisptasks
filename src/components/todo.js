import "../css/todo.css";
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
import projectList from "../projectsList";
const TodoDetails = (function () {
  const mainContainer = document.querySelector(".main-container");
  function renderDetails(id) {
    const todoDetailsSection = document.querySelector(".todo-details-section");
    // DOM Variables
    const fromActiveTodo = document.querySelector(".project-todo.active");
    const toActiveTodo = document.querySelector(
      `li.project-todo[data-id="${id}"]`
    );
    // getting todo data
    const currTodo = projectList.getTodoFromProject(
      mainContainer.dataset.id,
      id
    );
    if (fromActiveTodo) {
      if (fromActiveTodo.dataset.id == id) {
        clearDetails();
      } else {
        fromActiveTodo.classList.remove("active");
        todoDetailsSection.classList.add("active");
        toActiveTodo.classList.add("active");
      }
    } else {
      todoDetailsSection.classList.add("active");
      toActiveTodo.classList.add("active");
    }
    todoDetailsSection.innerHTML = /*html */ `
    <div class="todo-details">
      <div class="todo-details-header">
        <h3>${currTodo.title}</h3>
        <span class="details-close-btn"><i data-lucide="x" class="icon"></i></span>
      </div>
      <div class="todo-details-content-wrapper">
        <div class="todo-details-content">
            <p class="todo-details-description">
              ${currTodo.description}
            </p>
        </div>
        <div class="btns">
           <button class="btn todo-edit-btn" data-id="${currTodo.id}">
              Edit
            </button>
            <button class="btn-primary btn todo-delete-btn" data-id="${currTodo.id}">
              Delete
            </button>
        </div>
      </div>
    </div>
    `;
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
  function clearDetails() {
    const todoDetailsSection = document.querySelector(".todo-details-section");
    const fromActiveTodo = document.querySelector(".project-todo.active");
    todoDetailsSection.classList.remove("active");
    fromActiveTodo.classList.remove("active");
    todoDetailsSection.innerHTML = "";
  }
  return {
    renderDetails,
    clearDetails,
  };
})();
export default TodoDetails;
