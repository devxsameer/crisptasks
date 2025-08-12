import Events from "../events";
import "../css/project.css";
import projectList from "../projectsList";
import { createIcons, Bolt, SquarePen, Trash, Plus, Trash2 } from "lucide";

(() => {
  const contentContainer = document.querySelector(".content");
  function renderProject(id) {
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
          <div class="todo-title">Add New Todo</div>
        </li>`;
    project.todoList.forEach((todo) => {
      projectTodoList.innerHTML += /*html */ `
        <li class="project-todo">
          <div class="todo-title">
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
                ${projectTodoList.outerHTML}
              </div>
            </div>
            `;
    contentContainer.innerHTML = projectHtml;
    createIcons({
      icons: {
        Bolt,
        SquarePen,
        Trash,
        Plus,
        Trash2,
      },
    });
  }
  Events.on("render:project", renderProject);
})();
