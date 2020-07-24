var todos = [
  'item 1',
  'item 2',
  'item 3'
];

function displayTodos() {
  console.log('My todos:');

  todos.forEach(todo => {
    console.log(todo);
  })
}

displayTodos();

function addTodo(todo) {
  todos.push(todo);

  displayTodos();
}

addTodo('item 4');

function changeTodo(position, newValue) {
  todos[position] = newValue;

  displayTodos();
}

changeTodo(2, 'hey there');

function deleteTodo(position) {
  todos.splice(position, 1);

  displayTodos();
}

deleteTodo(1);