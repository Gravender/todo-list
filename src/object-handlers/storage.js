
import { Projects } from './projects';
import { task } from "./task";
import { format } from 'date-fns';
function createData(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function restore() {
    if (!localStorage.projects) {
        let projects = []
        projects.push(defaultProject());
        createData(projects);
        return projects;
    }
    else {
        let projects = localStorage.getItem('projects');
        projects = JSON.parse(projects);
        return projects;
    }
}
function defaultProject() {
    let project = new Projects('default');
    project.addTask(new task('task 1', 'the people', format(new Date(2050, 1, 11), 'yyyy-MM-dd'), '5'));
    project.addTask(new task('task 2', 'the people', format(new Date(2011, 1, 11), 'yyyy-MM-dd'), '2'));
    project.addTask(new task('task 3', 'the people', format(new Date(2010, 1, 11), 'yyyy-MM-dd'), '0'));
    project.addTask(new task('task 4', 'the people', format(new Date(2012, 1, 11), 'yyyy-MM-dd'), '1'));
    return project;
}
export{ restore, createData};