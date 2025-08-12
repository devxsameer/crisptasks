import Events from "./events.js";
import { Project, Todo } from "./classes.js";

const projectList = (function () {
  let list;
  function setProjectsList(data) {
    list = [];
    data.forEach(({ title, description, id, todoList }) => {
      let currProject = new Project({ title, description, id });
      todoList.forEach((todo) => {
        currProject.addTodo(new Todo(todo));
      });
      list.push(currProject);
    });
    Events.emit("data:changed", list);
    Events.emit("projects:changed", list);
  }
  function getProjectList() {
    return list;
  }
  function addProject(data) {
    list.push(new Project(data));
    Events.emit("data:changed", list);
    Events.emit("projects:changed", list);
  }
  function deleteProject(id) {
    list = list.filter((project) => project.id != id);
    Events.emit("data:changed", list);
    Events.emit("projects:changed", list);
  }
  function deleteTodoFromProject([projectId, todoId]) {
    list.find((i) => i.id === projectId).removeTodo(todoId);
    Events.emit("data:changed", list);
  }
  function addTodoInProject([projectId, data]) {
    list.find((i) => i.id === projectId).addTodo(new Todo(data));
    Events.emit("data:changed", list);
  }
  Events.on("ls:data:loaded", setProjectsList);
  Events.on("project:todo:added", addTodoInProject);
  Events.on("project:todo:deleted", deleteTodoFromProject);
  Events.on("project:added", addProject);
  Events.on("project:deleted", deleteProject);
  return {
    getProjectList,
  };
})();
export default projectList;
