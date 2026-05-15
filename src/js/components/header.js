export function createHeader() {
    const header = document.createElement('header');
    header.className = 'app-header';
    header.innerHTML = `
        <div class="logo">
            <h1>⚡ Odins Todo</h1>
        </div>
        <div class="header-actions">
            <button id="new-project-btn" class="btn-primary">
                <i class="fas fa-plus"></i> New Project
            </button>
        </div>
    `;
    return header;
}