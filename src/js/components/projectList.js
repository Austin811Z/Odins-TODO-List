export function createProjectList(projects, activeProjectId) {
    const container = document.createElement('div');
    container.className = 'project-list';

    projects.forEach(project => {
        const isActive = project.id === activeProjectId;
        
        const item = document.createElement('div');
        item.className = `project-item ${isActive ? 'active' : ''}`;
        item.dataset.id = project.id;
        item.innerHTML = `
            <span class="project-name">${project.name}</span>
            <span class="todo-count">${project.todos ? project.todos.length : 0}</span>
        `;
        container.appendChild(item);
    });

    return container;
}