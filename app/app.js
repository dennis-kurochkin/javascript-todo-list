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