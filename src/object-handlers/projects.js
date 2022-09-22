import { add } from "lodash";
import { createData } from "./storage";

class Project {
    constructor(title, tasks = []) {
        this.title = title;
        this.tasks = tasks;
    };
    addTask(task) {
        this.tasks.push(task);
    };
    deleteTask(target) {
        this.tasks.splice(this.locateTask(target), 1);
    }
    updateTask(target, property, value) {
        if (property == 'title') { this.tasks[this.locateTask(target)].title = value };
        if (property == 'description') { this.tasks[this.locateTask(target)].description = value };
        if (property == 'dueDate') { this.tasks[this.locateTask(target)].dueDate = value };
        if (property == 'priority') { this.tasks[this.locateTask(target)].priority = value };
        if (property == 'notes') { this.tasks[this.locateTask(target)].notes = value };
        if (property == 'completed') { this.tasks[this.locateTask(target)].completed = value };
    }
    locateTask(target) {
        return this.tasks.findIndex(x => x.isEqual(target));
    }
    isEqual(target) {
        return this.title == target.title;
    }
}
class Projects {
    constructor(list = [], currentProject = 'default') {
        this.list = list;
        this.currentProject = currentProject;
    }
    setCurrentProject(project) {
        this.currentProject = project;
        createData(this);
    }
    addProject(title) {
        this.list.push(new Project(title));
        createData(this);
    }
    insertTask(task, target = this.currentProject) {
        let project = this.locatebyProject(target);
        if (!project) {
            project = this.locatebyProject('default');
            if (!project) {
                this.addProject('default');
                project = this.locatebyProject('default');
            }
        }
        project.addTask(task);
        createData(this);
    }
    locatebyTask(target) {
        return this.list.find((project) => project.tasks.find((task) => task.isEqual(target)));
    }
    locatebyProject(target) {
        return this.list.find((project) => project.title == target);
    }
    deleteTask(target) {
        this.locatebyTask(target).deleteTask(target);
        createData(this);
    }
    deleteProject(target) {
        this.list.splice(this.list.findIndex(x => x.isEqual(target)), 1);
        createData(this);
    }
    locateTask(target){
        if(this.locatebyTask(target)){
            return this.locatebyTask(target).locateTask(target);
        }
        return -1;
    }
    updateTask(target, property, value) {
        this.locatebyTask(target).updateTask(target, property, value);
        createData(this);
    }
}
export { Projects, Project }