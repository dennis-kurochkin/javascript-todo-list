var todos = [
    'item 1',
    'item 2',
    'item 3'
];

console.log('My todos:', todos);

todos.push('item 4');

console.log('My todos:', todos);

todos[2] = 'edited item 3';

console.log('My todos:', todos);

todos.splice(0, 1);

console.log('My todos:', todos);