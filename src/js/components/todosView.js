export function createTodosView(todos) {
    const container = document.createElement('div');
    container.className = 'todos-view';

    if (!todos || todos.length === 0) {
        container.innerHTML = `
            <p class="empty-state">
                <i class="fas fa-clipboard-list"></i><br>
                No tasks yet.<br>
                Add one above!
            </p>`;
        return container;
    }

    const ul = document.createElement('ul');
    ul.className = 'todo-list';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.dataset.id = todo.id;
        li.innerHTML = `
            <input type="checkbox" 
                   class="todo-checkbox" 
                   ${todo.completed ? 'checked' : ''}>
            <span class="todo-text">${todo.text}</span>
            <button class="delete-todo" title="Delete task">
                <i class="fas fa-trash"></i>
            </button>
        `;
        ul.appendChild(li);
    });

    container.appendChild(ul);
    return container;
}