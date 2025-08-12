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
export { Todo, Project };
