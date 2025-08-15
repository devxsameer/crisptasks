import projectList from "../projectsList";
import "../css/project.css";
import { formatRelative } from "date-fns";
function renderProject(id) {
  const contentContainer = document.querySelector(".content");
  const project = projectList
    .getProjectList()
    .find((project) => project.id === id);
  const projectTodoList = document.createElement("ul");
  projectTodoList.classList.add("project-todo-list");
  projectTodoList.innerHTML += /*html */ `
        <li class="project-todo add-new-todo">
          <span class="btns">
              <i data-lucide="plus" class="icon"></i>
          </span>
          <div class="todo-title">Add New Task</div>
        </li>`;
  project.todoList.toReversed().forEach((todo) => {
    projectTodoList.innerHTML += /*html */ `
        <li class="project-todo" data-id="${todo.id}">
          <div class="todo-title">
            <span class="priority-span ${todo.priority}"></span>
            ${todo.title}
          </div>
          <div class="todo-btns">
            <span class="todo-edit-btn" data-id="${todo.id}">
              <i data-lucide="square-pen" class="icon"></i>
            </span>
            <span class="todo-delete-btn" data-id="${todo.id}">
              <i data-lucide="trash" class="icon"></i>
            </span>
          </div>
        </li>
        `;
  });
  const projectHtml = /* html */ `
        <div class="project">
            <div class="project-main">
              <div class="project-header">
                  <span>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                  </span>
                  <div class="btns">
                    <span class="project-settings">
                      <i data-lucide="bolt"></i>
                    </span>
                    <span class="project-delete">
                      <i data-lucide="trash-2"></i>
                    </span>
                  </div>
              </div>
              <div class="project-info">
                <div class="project-creation-date">
                  <span>
                    Date Added:
                  </span>
                  ${formatRelative(project.dateAdded, new Date())}
                </div>
                <div class="project-priority-details">
                  <span>
                    Priority: 
                  </span>
                  <ul>
                    <li><span class="priority-span high"></span><span>High</span></li>
                    <li><span class="priority-span medium"></span><span>Medium</span></li>
                    <li><span class="priority-span low"></span><span>Low</span></li>
                  </ul>
                </div>
              </div>
              ${projectTodoList.outerHTML}
            </div>
        </div>
        <div class="todo-details-section"></div>
            `;
  contentContainer.innerHTML = projectHtml;
}
export default renderProject;
