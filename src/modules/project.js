class Project {
    constructor(name, todoArr = [], startDate, deadline){
        this.name = name;
        this.todoArr = todoArr;
        this.startDate = startDate;
        this.deadline = deadline;
        this.id = crypto.randomUUID(); 
    }
}

export default Project;