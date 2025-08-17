import LocalStorage from "../localstorage";
import { compareAsc, parseISO, format } from "date-fns";
import UI from "../ui";
import "../css/dashboard.css";
import projectList from "../projectsList";
const renderDashboard = function () {
  let todoList = [];
  let list = projectList.getProjectList();
  list.forEach((project) => {
    project.todoList.forEach((todo) => {
      todoList.push(todo);
    });
  });
  const contentContainer = document.querySelector(".content");
  contentContainer.innerHTML = /*html*/ `
      <div class="dashboard">
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
        <div class="dashboard-main">
          <div class="dashboard-heading">
            <h3>
              ${UI.getGreeting()}, 
              <span>${LocalStorage.getName()}</span>
            </h3>
            <p>${format(new Date(), "'Today,' EEEE dd MMMM yyyy")}</p>
          </div>
          <div class="dashboard-stats">
            <span>
              Total Projects: <span>${list.reduce((val) => val + 1, 0)}</span>
            </span>
            <span>
              Total Tasks: <span>${todoList.reduce((val) => val + 1, 0)}</span>
            </span>
            <span>
              Total Tasks Overdue: <span>${todoList.reduce((val, curr) => {
                if (compareAsc(parseISO(curr.dueDate), new Date()) == -1) {
                  return val + 1;
                } else {
                  return val;
                }
              }, 0)}</span>
            </span>
            <span>
              Total Tasks Pending: <span>${todoList.reduce((val, curr) => {
                if (compareAsc(parseISO(curr.dueDate), new Date()) == 1) {
                  return val + 1;
                } else {
                  return val;
                }
              }, 0)}</span>
            </span>
          </div>
          <div class="dashboard-task-list">
            <div class="dashboard-task-list-header">
              <span>Tasks</span>
              <div class="select-wrapper">Sort by:
                <select name="dashboardSort" id="dashboard-sort">
                  <option value="dateAdded" selected>Date Added</option>
                  <option value="title"> Title</option>
                  <option value="dueDate">Due Date</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
            </div>
            <ul class="dashboard-task-list-content">
            </ul>
          </div>
        </div>
        <div class="dashboard-footer">
          <span>Made with &hearts; by <a href="https://github.com/devxsameer" target="_blank" rel="noopener noreferrer">@devxsameer</a></span>
        </div>
      </div>
  `;
  renderTodos(
    todoList.sort((a, b) =>
      compareAsc(parseISO(b.dateAdded), parseISO(a.dateAdded))
    )
  );
  function renderTodos(list) {
    const todoListUl = document.querySelector(".dashboard-task-list-content");
    todoListUl.innerHTML = "";
    list.forEach((todo) => {
      const li = document.createElement("li");
      li.innerHTML = /*html*/ `
      <h4>${todo.title}</h4>
      <div class="info">
          <div class="priority">
            <span class="priority-span ${todo.priority}"></span>
            ${todo.priority}
          </div>
        <div class="date-added">Added: <span>${format(
          todo.dateAdded,
          "dd MMMM yyyy"
        )}</span>
        </div>
        <div class="due-date">
          <span>
            Due:${format(todo.dueDate, "dd MMMM yyyy")}
          </span>
        </div>
      </div>
      `;
      todoListUl.appendChild(li);
    });
  }
  const priorityOrder = {
    low: 1,
    medium: 2,
    high: 3,
  };
  const sortSelect = document.querySelector("#dashboard-sort");
  sortSelect.addEventListener("change", (e) => {
    const criteria = e.target.value;
    if (criteria == "title") {
      todoList.sort((a, b) => a.title.localeCompare(b.title));
      console.log(todoList);
    } else if (criteria === "dueDate") {
      todoList.sort((a, b) =>
        compareAsc(parseISO(a.dueDate), parseISO(b.dueDate))
      );
    } else if (criteria === "priority") {
      todoList.sort(
        (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
      );
    } else {
      todoList.sort((a, b) =>
        compareAsc(parseISO(b.dateAdded), parseISO(a.dateAdded))
      );
    }
    renderTodos(todoList);
  });
};
export default renderDashboard;
