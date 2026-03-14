
import app from "../modules/app.js";

function addProjectForm(onProjectAdded) {
  const heading = document.createElement("h4");
  heading.textContent = "Add Project:";
  const form = document.createElement("form");
  form.classList.add("add-project-form");
  const projectNameInput = document.createElement("input");
  projectNameInput.type = "text";
  projectNameInput.placeholder = "Project name";
  projectNameInput.required = true;
  const startDateInput = document.createElement("input");
  startDateInput.type = "date";
  startDateInput.id = "startDateInput";
  startDateInput.required = true;
  const startDateLabel = document.createElement("label");
  startDateLabel.htmlFor = "startDateInput";
  startDateLabel.textContent = "Project start:";
  const deadlineInput = document.createElement("input");
  deadlineInput.type = "date";
  deadlineInput.id = "deadlineInput";
  const deadlineLabel = document.createElement("label");
  deadlineLabel.htmlFor = "deadlineInput";
  deadlineLabel.textContent = "Deadline:";
  deadlineInput.required = true;
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Add Project";

  form.append(
    heading,
    projectNameInput,
    startDateLabel,
    startDateInput,
    deadlineLabel,
    deadlineInput,
    submitBtn,
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = projectNameInput.value;
    const startDate = new Date(startDateInput.value);
    const deadline = new Date(deadlineInput.value);

    app.addProject(name, startDate, deadline);

    onProjectAdded();

    form.reset();
  });

  return form;
}

export default addProjectForm;
