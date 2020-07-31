// Todo Class
var Todo = function (text) {

  this.todoText = text;
  this.completed = false;

  // Method to toggle the todo completion
  this.toggleCompleted = function () {
    this.completed = !this.completed;
  }

  // Method to complete the todo
  this.complete = function () {
    this.completed = true;
  }

}

// Main App object
var App = {

  // DOM Elements
  DOMElements: {
    buttonDisplayTodos: '.js-display-todos',
    buttonToggleAll: '.js-toggle-all',
    addTodoForm: '.js-add-todo-form'
  },

  // Todos data array
  todos: [
    new Todo('item 1'),
    new Todo('item 2'),
    new Todo('item 3')
  ],

  // Method to display todos
  displayTodos: function () {
    if (this.todos.length > 0) {
      // console.log('My todos:');
      // this.todos.forEach(todo => console.log(todo.completed ? '[x]' : '[ ]', todo.todoText));
      // console.log('==========');
      var todoList = document.querySelector('.js-todo-list');

      todoList.innerHTML = '';

      this.todos.forEach(function (todo, index) {
        var todoElement = document.createElement('li');
        todoElement.innerText = `${index}. [${todo.completed ? 'x' : ' '}] ${todo.todoText}`;
        todoList.appendChild(todoElement);
      });
    } else {
      console.log('You have no todos. Why wouldn\'t you add them?');
    }
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
  },

  // Method to toggle all the todos
  toggleAll: function () {
    var everyTodoIsCompleted = true;

    // Check if every todo is completed
    this.todos.forEach(function (todo) {
      if (!todo.completed) {
        everyTodoIsCompleted = false;
      }
    });

    this.todos.forEach(function (todo) {
      if (everyTodoIsCompleted) { // if every todo is completed then toggle them all to be uncompleted
        todo.toggleCompleted();
      } else { // if there are completed todos in the list then complete all of them
        todo.complete();
      }
    });

    this.displayTodos();
  },

  // Init method
  init: function () {

    var self = this;

    this.displayTodos();

    // Add event listener for the toggle all button
    document.querySelector(this.DOMElements.buttonToggleAll).addEventListener('click', function () {
      self.toggleAll();
    });

    // Add event listener for the add todo button
    document.querySelector(this.DOMElements.addTodoForm).addEventListener('submit', function (e) {
      e.preventDefault();

      var todoTextInput = this.querySelector('input');

      // Check if input contains a value
      if (todoTextInput.value !== '') {
        self.addTodo(todoTextInput.value); // add todo with the value from the input
        todoTextInput.value = ''; // clear the input
      }
    });

  }

}

// Init app
App.init();