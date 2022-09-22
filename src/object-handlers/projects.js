import { createData } from "./storage";

class Project {
    constructor(title, tasks= []) {
        this.title = title;
        this.tasks = tasks;
    };
    addTask(task) {
        this.tasks.push(task);
    };
    deleteTask(target){
        this.tasks.splice(this.locateTask(target));
    }
    locateTask(target){
        return this.tasks.index(target);
    }
}
class Projects{
    constructor(list = [], currentProject= 'default'){
        this.list = list;
        this.currentProject = currentProject;
    }
    setCurrentProject(project){
        this.currentProject = project;
        createData(this);
    }
    addProject(title){
        this.list.push(new Project(title));
        createData(this);
    }
    insertTask(target, task){
        this.locatebyProject(target).addTask(task);
        createData(this);
    }
    locatebyTask(target){
         return this.list.find((project) => project.find((task) => task == target));
    }
    locatebyProject(target){
        return this.list.find((project)=> project.title == target);
    }
    deleteTask(target){
        this.locatebyTask(target).deleteTask(target);
        createData(this);
    }
}
export { Projects, Project }