// src/js/main.js
import '../css/style.css';

import { createHeader } from './components/header.js';
import { createAddProjectForm } from './components/addProjectForm.js';
import { createProjectList } from './components/projectList.js';
import { createAddTodoForm } from './components/addTodoForm.js';
import { createTodosView } from './components/todosView.js';

// ====================== STATE ======================
let projects = [];
let activeProjectId = null;
const STORAGE_KEY = 'odinsTodoApp';

// ====================== STORAGE ======================
function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ projects, activeProjectId }));
}

function loadFromStorage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        const data = JSON.parse(saved);
        projects = data.projects || [];
        activeProjectId = data.activeProjectId || null;
    }

    if (projects.length === 0) {
        projects.push({
            id: Date.now(),
            name: "My Tasks",
            todos: []
        });
        activeProjectId = projects[0].id;
    }
}

function getActiveProject() {
    return projects.find(p => p.id === activeProjectId);
}

function saveAndRefresh() {
    saveToStorage();
    renderProjectList();
    renderCurrentProject();
}

// ====================== RENDER ======================
function renderHeader() {
    const container = document.getElementById('header-container');
    container.innerHTML = '';
    container.appendChild(createHeader());
}

function renderProjectList() {
    const container = document.getElementById('project-list-container');
    container.innerHTML = '';
    container.appendChild(createProjectList(projects, activeProjectId));
}

function renderCurrentProject() {
    const project = getActiveProject();
    if (!project) return;

    document.getElementById('current-project-title').textContent = project.name;

    // Add Todo Form
    document.getElementById('add-todo-container').innerHTML = '';
    document.getElementById('add-todo-container').appendChild(createAddTodoForm());

    // Todos
    document.getElementById('todos-container').innerHTML = '';
    document.getElementById('todos-container').appendChild(createTodosView(project.todos));
}

// ====================== EVENT HANDLERS ======================
function setupListeners() {
    document.addEventListener('click', (e) => {

        // New Project
        if (e.target.id === 'new-project-btn') {
            document.getElementById('add-project-container').appendChild(createAddProjectForm());
        }

        // Project Click
        if (e.target.closest('.project-item')) {
            activeProjectId = Number(e.target.closest('.project-item').dataset.id);
            saveAndRefresh();
        }

        // Add Todo
        if (e.target.id === 'add-todo-btn') {
            const input = document.getElementById('todo-input');
            if (input.value.trim()) {
                const project = getActiveProject();
                project.todos.push({
                    id: Date.now(),
                    text: input.value.trim(),
                    completed: false
                });
                input.value = '';
                saveAndRefresh();
            }
        }

        // Toggle Todo
        if (e.target.classList.contains('todo-checkbox')) {
            const todoId = Number(e.target.closest('.todo-item').dataset.id);
            const project = getActiveProject();
            const todo = project.todos.find(t => t.id === todoId);
            if (todo) todo.completed = !todo.completed;
            saveAndRefresh();
        }

        // Delete Todo
        if (e.target.closest('.delete-todo')) {
            const todoId = Number(e.target.closest('.todo-item').dataset.id);
            const project = getActiveProject();
            project.todos = project.todos.filter(t => t.id !== todoId);
            saveAndRefresh();
        }

        // Add Project Form
        if (e.target.id === 'save-project') {
            const input = document.getElementById('project-name');
            if (input.value.trim()) {
                const newProject = {
                    id: Date.now(),
                    name: input.value.trim(),
                    todos: []
                };
                projects.push(newProject);
                activeProjectId = newProject.id;
                document.querySelector('.add-project-form').remove();
                saveAndRefresh();
            }
        }

        if (e.target.id === 'cancel-project') {
            document.querySelector('.add-project-form').remove();
        }
    });
}

// ====================== INIT ======================
function init() {
    loadFromStorage();
    renderHeader();
    renderProjectList();
    renderCurrentProject();
    setupListeners();

    console.log('✅ Odins Todo App loaded successfully!');
}

document.addEventListener('DOMContentLoaded', init);