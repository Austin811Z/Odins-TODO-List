export function createAddProjectForm() {
    const form = document.createElement('div');
    form.className = 'add-project-form';
    form.innerHTML = `
        <h3>New Project</h3>
        <input type="text" id="project-name" placeholder="Project name (e.g. Work, Personal)" autofocus>
        <div class="form-actions">
            <button id="cancel-project" class="btn-secondary">Cancel</button>
            <button id="save-project" class="btn-primary">Create Project</button>
        </div>
    `;
    return form;
}