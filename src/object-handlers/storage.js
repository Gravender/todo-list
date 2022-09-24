
import { Projects, Project} from './projects';
import { task } from "./task";
import { format } from 'date-fns';
function createData(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function restore() {
    if (!localStorage.projects) {
        let projects = new Projects();
        projects.list.push(defaultProject());
        createData(projects);
        return projects;
    }
    else {
        let projects_ = new Projects();
        let parsedProjects = localStorage.getItem('projects');
        let x, currentProject = JSON.parse(parsedProjects);
        currentProject.list.forEach(element => {
            projects_.list.push(importProject(element.title, element.tasks));
        });
        projects_.currentProject =currentProject.currentProject;
        return projects_;
    }
}
function defaultProject() {
    let project = new Project('default');
    project.addTask(new task('task 1', 'this is the description', format(new Date(2010, 1, 11), 'yyyy-MM-dd'), '1'));
    project.addTask(new task('task 2', 'this is the description', format(new Date(2011, 1, 11), 'yyyy-MM-dd'), '2'));
    project.addTask(new task('task 3', 'this is the description', format(new Date(2010, 1, 11), 'yyyy-MM-dd'), '3'));
    project.addTask(new task('task 4', 'this is the description', format(new Date(2012, 1, 11), 'yyyy-MM-dd'), '4'));
    project.addTask(new task('task 5', 'this is the description', format(new Date(2012, 1, 11), 'yyyy-MM-dd'), '5'));
    return project;
}
function importProject(title, tasks){
    let temp = [];
    tasks.forEach(element =>{
        temp.push(importTasks(element));
    });
    return new Project(title, temp);
}
function importTasks(task_){
    return (new task(task_.title,task_.description,task_.dueDate, task_.priority, task_.notes, task_.completed, task_.isExpanded));
}
export{ restore, createData};