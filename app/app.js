// Todo Class
var Todo = function (text) {
  this.todoText = text;
  this.completed = false;

  // Method to toggle the todo completion
  this.toggleCompleted = function () {
    this.completed = !this.completed;
  }
}

var todos = {
  // Todos data array
  todos: [
    new Todo('item 1'),
    new Todo('item 2'),
    new Todo('item 3')
  ],
  // Method to display todos
  displayTodos: function () {
    console.log('My todos:');
    this.todos.forEach(todo => console.log(todo.completed ? '[x]' : '[ ]', todo.todoText));
    console.log('==========');
  },
  // Method to add todo
  addTodo: function (todoText) {
    this.todos.push(new Todo(todoText));
    this.displayTodos();
  },
  // Method to change todo
  changeTodo: function (position, newTodoText) {
    this.todos[position].todoText = newTodoText;
    this.displayTodos();
  },
  // Method to delete todo
  deleteTodo: function (position) {
    this.todos.splice(position, 1);
    this.displayTodos();
  },
  // Method to toggle the todo completion
  toggleCompleted: function (position) {
    this.todos[position].toggleCompleted();
    this.displayTodos();
  }
}

todos.displayTodos();
todos.addTodo('item 4');
todos.changeTodo(2, 'hey there');
todos.toggleCompleted(1);
todos.deleteTodo(0);