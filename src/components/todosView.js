import app from "../modules/app.js";

function todosView(projectId, onBack) {
    const container = document.createElement("div");
    container.classList.add("card")
    const project = app.getProject(projectId);
    const backbtn = document.createElement("button");
    backbtn.textContent = "Back to Projects";

    backbtn.addEventListener("click", ()=>{
        onBack()
    });

    container.appendChild(backbtn);

    const todoTitle = document.createElement("h2");
    todoTitle.textContent = project.name; 

    container.appendChild(todoTitle);

    const todos = app.getTodosFromProject(projectId);

    if (todos.length === 0) {
        const emptyMsg = document.createElement("p");
        emptyMsg.textContent = "No todos yet"
        container.appendChild(emptyMsg);
    } else {
        todos.forEach((todo) => {
            const todoCard = document.createElement("div");
            todoCard.classList.add("todo-card");
            const todoName = document.createElement("h3");
            todoName.textContent = todo.title;
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";

            deleteBtn.addEventListener("click", () =>{
                app.removeTodoFromProject(projectId, todo.id);
                onBack();
            });

            todoCard.append(todoName, deleteBtn);
            container.appendChild(todoCard);
        });
    }
    return container;
}

export default todosView;