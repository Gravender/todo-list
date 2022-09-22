import { createData } from "./storage";

class Project {
    constructor(title, tasks= []) {
        this.title = title;
        this.tasks = tasks;
    };
    addTask(task) {
        this.tasks.push(task);  
    };
}
class Projects{
    constructor(list = [], currentProject= 'default'){
        this.list = list;
        this.currentProject = currentProject;
    }
    addProject(title){
        this.list.push(new Project(title));
        createData(this);
    }
    insertTask(target, task){
        this.locatebyProject(target).addTask(task);
        createData(this);
    }
    // locatebyTask(target){
    //     return this.list.find((project) => 
    //     project.tasks.find(task) => task.title == target);
    // }
    locatebyProject(target){
        return this.list.find((project)=> project.title == target)
    }
}
export { Projects, Project }