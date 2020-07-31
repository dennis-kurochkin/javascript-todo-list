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

// UI component
var UI = (function () {
  // DOM Elements
  var DOMElements = {
    buttonDisplayTodos: '.js-display-todos',
    buttonToggleAll: '.js-toggle-all',
    addTodoForm: '.js-add-todo-form',
    changeTodoForm: '.js-change-todo-form',
    deleteTodoForm: '.js-delete-todo-form',
    toggleCompletedTodoForm: '.js-toggle-completed-todo-form',
    todoList: '.js-todo-list',
  }

  return {
    // Method to get DOM elements
    getDOMElements: function () {
      return DOMElements;
    },
    // Method to display todos
    displayTodos: function () {
      var todoList = document.querySelector(DOMElements.todoList);
      var todos = App.getTodos();

      todoList.innerHTML = '';

      todos.forEach(function (todo, index) {
        var todoElement = document.createElement('li');

        todoElement.innerText = `${index}. [${todo.completed ? 'x' : ' '}] ${todo.todoText}`;
        todoList.appendChild(todoElement);
      });
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

      UI.displayTodos();
    },
    // Change todo handler
    changeTodoHandler: function (e) {
      e.preventDefault()

      var todos = App.getTodos();
      var todoPositionInput = this.querySelector('input.js-todo-position');
      var todoTextInput = this.querySelector('input.js-todo-text');

      if (
        todoPositionInput.value !== '' && todoTextInput.value !== '' && // check if inputs contain values
        todoPositionInput.valueAsNumber < todos.length // check if input position is valid
      ) {
        App.changeTodo(todoPositionInput.value, todoTextInput.value); // change todo with the given parameters
        todoPositionInput.value = ''; // clear the inputs
        todoTextInput.value = '';
      }

      UI.displayTodos();
    },
    // Delete todo handler
    deleteTodoHandler: function (e) {
      e.preventDefault()

      var todos = App.getTodos();
      var todoPositionInput = this.querySelector('input.js-todo-position');

      // Check if the input contains value
      if (todoPositionInput.value !== '' && todoPositionInput.valueAsNumber < todos.length) {
        App.deleteTodo(todoPositionInput.value); // change todo with the given parameters
        todoPositionInput.value = ''; // clear the inputs
      }

      UI.displayTodos();
    },
    // Toggle completed handler
    toggleCompletedHandler: function (e) {
      e.preventDefault();

      var todos = App.getTodos();
      var todoPositionInput = this.querySelector('input.js-todo-position');

      // Check if the input contains value
      if (todoPositionInput.value !== '' && todoPositionInput.valueAsNumber < todos.length) {
        App.toggleCompleted(todoPositionInput.value); // toggle todo
        todoPositionInput.value = ''; // clear the input
      }

      UI.displayTodos();
    },
    // Toggle all handler
    toggleAllHandler: function () {
      App.toggleAll();
      UI.displayTodos();
    }
  }
})()

// Main App object
var App = (function () {

  // Todos data array
  var todos = [
    new Todo('item 1'),
    new Todo('item 2'),
    new Todo('item 3')
  ];

  return {
    // Get todos array
    getTodos: function () {
      return todos;
    },

    // Method to add todo
    addTodo: function (todoText) {
      todos.push(new Todo(todoText));
    },

    // Method to change todo
    changeTodo: function (position, newTodoText) {
      todos[position].todoText = newTodoText;
    },

    // Method to delete todo
    deleteTodo: function (position) {
      todos.splice(position, 1);
    },

    // Method to toggle the todo completion
    toggleCompleted: function (position) {
      todos[position].toggleCompleted();
    },

    // Method to toggle all the todos
    toggleAll: function () {
      var everyTodoIsCompleted = true;

      // Check if every todo is completed
      todos.forEach(function (todo) {
        if (!todo.completed) {
          everyTodoIsCompleted = false;
        }
      });

      todos.forEach(function (todo) {
        if (everyTodoIsCompleted) { // if every todo is completed then toggle them all to be uncompleted
          todo.toggleCompleted();
        } else { // if there are completed todos in the list then complete all of them
          todo.complete();
        }
      });
    },

    // Init method
    init: function () {
      var DOMElements = UI.getDOMElements();

      // Display initial todos
      UI.displayTodos();

      // Add event listener for the add todo form
      document.querySelector(DOMElements.addTodoForm)
        .addEventListener('submit', UI.addTodoHandler);

      // Add event listener for the change todo form
      document.querySelector(DOMElements.changeTodoForm)
        .addEventListener('submit', UI.changeTodoHandler);

      // Add event listener for the delete todo form
      document.querySelector(DOMElements.deleteTodoForm)
        .addEventListener('submit', UI.deleteTodoHandler);

      // Add event listener for the toggle completed todo form
      document.querySelector(DOMElements.toggleCompletedTodoForm)
        .addEventListener('submit', UI.toggleCompletedHandler)

      // Add event listener for the toggle all button
      document.querySelector(DOMElements.buttonToggleAll)
        .addEventListener('click', UI.toggleAllHandler);
    }

  }
})();

// Init app
App.init();