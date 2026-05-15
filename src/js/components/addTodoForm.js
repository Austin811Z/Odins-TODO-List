export function createAddTodoForm() {
    const form = document.createElement('div');
    form.className = 'add-todo-form';
    form.innerHTML = `
        <input 
            type="text" 
            id="todo-input" 
            placeholder="What needs to be done?"
            autocomplete="off"
        >
        <button id="add-todo-btn" class="btn-primary">
            <i class="fas fa-plus"></i> Add
        </button>
    `;
    return form;
}