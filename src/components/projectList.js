import app from "../modules/app.js";

function projectList(onViewTodos, onRefresh) {
  const projectContainer = document.createElement("div");
  projectContainer.classList.add("projects-container");
  const projects = app.getAllProjects();
  projects.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");
    projectCard.innerHTML = `
        <h3>${project.name}</h3>
        <p><strong>Start:</strong>${project.startDate.toLocaleDateString()}</p>
        <p><strong>Deadline:</strong>${project.deadline.toLocaleDateString()}</p>
        <p><strong>Todos:</strong>${project.todoArr.length}</p>
        <div class="project-actions">
            <button class="view-btn">View Todos</button>
            <button class="delete-btn">Delete</button>
        </div>
        
        `;

    const deleteBtn = projectCard.querySelector(".delete-btn");
    const viewBtn = projectCard.querySelector(".view-btn");

    deleteBtn.addEventListener("click", () => {
      app.removeProject(project.id);
      onRefresh();
    });

    viewBtn.addEventListener("click", () => {
      onViewTodos(project.id);
    });

    projectContainer.appendChild(projectCard);
  });

  return projectContainer;
}

export default projectList;