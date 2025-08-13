import LS from "./localstorage.js";
class Todo {
  constructor({
    title,
    description,
    dueDate,
    priority,
    notes = "",
    checkList = [],
    id = crypto.randomUUID(),
  }) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checkList = checkList;
    this.id = id;
  }
}
class Project {
  constructor({ id, title, description, todoList }) {
    this.id = id ? id : crypto.randomUUID();
    this.title = title;
    this.description = description;
    if (!todoList) {
      this.todoList = [];
    } else {
      this.todoList = todoList;
    }
  }
  addTodo(todo) {
    this.todoList.unshift(todo);
  }
  removeTodo(id) {
    this.todoList = this.todoList.filter((todo) => todo.id != id);
  }
}
const projectList = (function () {
  let list;
  function setProjectsList() {
    list = [];
    const data = LS.getData();
    data.forEach(({ title, description, id, todoList }) => {
      let currProject = new Project({ title, description, id });
      todoList.forEach((todo) => {
        currProject.addTodo(new Todo(todo));
      });
      list.push(currProject);
    });
  }
  function getProjectList() {
    return list;
  }
  function addProject(data) {
    list.unshift(new Project(data));
    LS.setData(list);
  }
  function getProject(id) {
    return list.find((project) => project.id == id);
  }
  function deleteProject(id) {
    list = list.filter((project) => project.id != id);
    LS.setData(list);
  }
  function deleteTodoFromProject([projectId, todoId]) {
    list.find((i) => i.id === projectId).removeTodo(todoId);
    LS.setData(list);
  }
  function addTodoInProject([projectId, data]) {
    list.find((i) => i.id === projectId).addTodo(new Todo(data));
    LS.setData(list);
  }
  function getTodoFromProject(projectId, todoId) {
    const currProject = list.find((project) => project.id == projectId);
    return currProject.todoList.find((todo) => todo.id == todoId);
  }
  return {
    getProjectList,
    setProjectsList,
    addProject,
    deleteProject,
    getProject,
    deleteTodoFromProject,
    addTodoInProject,
    getTodoFromProject,
  };
})();
export default projectList;
