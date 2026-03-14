
import Todo from "./todo.js";
import Project from "./project.js";

class App {
  constructor() {
    this.projects = [];
    this.loadFromStorage();
    if (this.projects.length === 0) {
        this.createDefaultProject();
    }
  }

  createDefaultProject() {
    const today = new Date();
    const name = today.toLocaleDateString();
    const startDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      0,
      0,
      0,
    );
    const deadline = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      59,
      59,
    );
    const defaultProject = new Project(name, [], startDate, deadline);

    this.projects.push(defaultProject);
  }

  addProject(name, startDate, deadline) {
    const newProject = new Project(name, [], startDate, deadline);
    this.projects.push(newProject);
    this.saveToStorage();
    return newProject;
  }

  removeProject(projectId) {
    const index = this.projects.findIndex(
      (project) => project.id === projectId,
    );
    if (index !== -1) {
      this.projects.splice(index, 1);
      this.saveToStorage()
    }
  }

  getProject(projectId) {
    return this.projects.find((project) => project.id === projectId);
  }

  getAllProjects() {
    return this.projects;
  }

  addTodoToProject(projectId, title) {
    const project = this.getProject(projectId);
    if (!project) return null;

    const newTodo = new Todo(title, "", null, "normal");
    project.todoArr.push(newTodo);
    this.saveToStorage()
    return newTodo;
  }

  addTodoToDefaultProject(title) {
    const defaultProject = this.projects[0];
    return this.addTodoToProject(defaultProject.id, title);
  }

  removeTodoFromProject(projectId, todoId) {
    const project = this.getProject(projectId);
    if (!project) return;

    const index = project.todoArr.findIndex(todo => todo.id === todoId);
    if (index !== -1) {
        project.todoArr.splice(index, 1);
        this.saveToStorage();
    }
  }

  getTodosFromProject(projectId) {
    const project = this.getProject(projectId);
    if (!project) return [];
    return project.todoArr;
  }

  saveToStorage(){
    const data = JSON.stringify(this.projects);
    localStorage.setItem('projects', data);

  }

  loadFromStorage(){
    const data = localStorage.getItem('projects');
    if (!data) return;

    const parsedData = JSON.parse(data);

    this.projects = parsedData.map(projectData => {
        const reconstructedTodos = projectData.todoArr.map(todoData =>{
            const todo = new Todo(
                todoData.title,
                todoData.description,
                todoData.dueDate,
                todoData.priority,
                todoData.isComplete
            );
            todo.id = todoData.id;
            return todo;
        });
        const project = new Project(
            projectData.name,
            reconstructedTodos,
            new Date(projectData.startDate),
            new Date(projectData.deadline)
        );
        project.id = projectData.id;
        return project;
    });

  }
}

export default new App();
