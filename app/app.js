var todos = {
  // Todos data array
  todos: [
    'item 1',
    'item 2',
    'item 3'
  ],
  // Method to display todos
  displayTodos: function () {
    console.log('My todos:');

    this.todos.forEach(todo => console.log(todo));

    console.log('==========');
  },
  // Method to add todo
  addTodo: function (todo) {
    this.todos.push(todo);
    this.displayTodos();
  },
  // Method to change todo
  changeTodo: function (position, newValue) {
    this.todos[position] = newValue;
    this.displayTodos();
  },
  // Method to delete todo
  deleteTodo: function (position) {
    this.todos.splice(position, 1);
    this.displayTodos();
  }
}

todos.displayTodos();
todos.addTodo('item 4');
todos.changeTodo(2, 'hey there');
todos.deleteTodo(1);