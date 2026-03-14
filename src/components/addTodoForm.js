import app from "../modules/app.js";

function addTodoForm(onTodoAdded) {
  const heading = document.createElement("h4");
  heading.textContent = "Add Task:";
  const form = document.createElement("form");
  form.classList.add("add-todo-form");
  const todoName = document.createElement("input");
  todoName.type = "text";
  todoName.placeholder = "What needs to be done?";
  todoName.required = true;
  const selectProject = document.createElement("select");
  selectProject.id = "selectProject";
  const selectProjectLabel = document.createElement("label");
  selectProjectLabel.htmlFor = "selectProject";
  selectProjectLabel.textContent = "Add to Project:";
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Add Todo";

  form.append(heading, todoName, selectProjectLabel, selectProject, submitBtn);

  const projects = app.getAllProjects();
  projects.forEach((project) => {
    const selectOption = document.createElement("option");
    selectOption.value = project.id;
    selectOption.textContent = project.name;

    selectProject.appendChild(selectOption);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = todoName.value;
    const projectId = selectProject.value;

    app.addTodoToProject(projectId, title);
    onTodoAdded();

    form.reset();
  });

  return form;
}

export default addTodoForm;