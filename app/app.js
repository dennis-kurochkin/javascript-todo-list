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
    addTodoForm: '.js-add-todo-form',
    changeTodoForm: '.js-change-todo-form',
    deleteTodoForm: '.js-delete-todo-form',
    toggleCompletedTodoForm: '.js-toggle-completed-todo-form',
    todoList: '.js-todo-list',
  },

  // Todos data array
  todos: [
    new Todo('item 1'),
    new Todo('item 2'),
    new Todo('item 3')
  ],

  // Method to display todos
  displayTodos: function () {
    var todoList = document.querySelector(this.DOMElements.todoList);

    if (this.todos.length > 0) {
      todoList.innerHTML = '';

      this.todos.forEach(function (todo, index) {
        var todoElement = document.createElement('li');

        todoElement.innerText = `${index}. [${todo.completed ? 'x' : ' '}] ${todo.todoText}`;
        todoList.appendChild(todoElement);
      });
    } else {
      todoList.innerHTML = '';
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

  // Event handlers
  handlers: {
    // Toggle all handler
    toggleAllHandler: function () {
      App.toggleAll();
    },
    // Add todo handler
    addTodoHandler: function (e) {
      e.preventDefault();

      var todoTextInput = this.querySelector('input');

      // Check if input contains a value
      if (todoTextInput.value !== '') {
        App.addTodo(todoTextInput.value); // add todo with the value from the input
        todoTextInput.value = ''; // clear the input
      }
    },
    // Change todo handler
    changeTodoHandler: function (e) {
      e.preventDefault()

      var todoPositionInput = this.querySelector('input.js-todo-position');
      var todoTextInput = this.querySelector('input.js-todo-text');

      if (
        todoPositionInput.value !== '' && todoTextInput.value !== '' && // check if inputs contain values
        todoPositionInput.valueAsNumber < App.todos.length // check if input position is valid
      ) {
        App.changeTodo(todoPositionInput.value, todoTextInput.value); // change todo with the given parameters
        todoPositionInput.value = ''; // clear the inputs
        todoTextInput.value = '';
      }
    },
    // Delete todo handler
    deleteTodoHandler: function (e) {
      e.preventDefault()

      var todoPositionInput = this.querySelector('input.js-todo-position');

      // Check if the input contains value
      if (todoPositionInput.value !== '' && todoPositionInput.valueAsNumber < App.todos.length) {
        App.deleteTodo(todoPositionInput.value); // change todo with the given parameters
        todoPositionInput.value = ''; // clear the inputs
      }
    },
    // Toggle completed handler
    toggleCompletedHandler: function (e) {
      e.preventDefault();

      var todoPositionInput = this.querySelector('input.js-todo-position');

      // Check if the input contains value
      if (todoPositionInput.value !== '' && todoPositionInput.valueAsNumber < App.todos.length) {
        App.toggleCompleted(todoPositionInput.value); // toggle todo
        todoPositionInput.value = ''; // clear the input
      }
    }
  },

  // Init method
  init: function () {
    var self = this;

    // Display initial todos
    this.displayTodos();

    // Add event listener for the toggle all button
    document.querySelector(this.DOMElements.buttonToggleAll)
      .addEventListener('click', this.handlers.toggleAllHandler);

    // Add event listener for the add todo form
    document.querySelector(this.DOMElements.addTodoForm)
      .addEventListener('submit', this.handlers.addTodoHandler);

    // Add event listener for the change todo form
    document.querySelector(this.DOMElements.changeTodoForm)
      .addEventListener('submit', this.handlers.changeTodoHandler);

    // Add event listener for the delete todo form
    document.querySelector(this.DOMElements.deleteTodoForm)
      .addEventListener('submit', this.handlers.deleteTodoHandler);

    // Add event listener for the toggle completed todo form
    document.querySelector(this.DOMElements.toggleCompletedTodoForm)
      .addEventListener('submit', this.handlers.toggleCompletedHandler)
  }

}

// Init app
App.init();