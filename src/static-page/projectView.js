import { loadTaskView } from "./taskView";
import { restore } from '../object-handlers/storage';
import setAttributes from "../helper-functions/setAttributes";
import renderStaticPages from "./staticPages";
export function loadProjectView(){
    let projects = restore();
    const projectDiv = document.createElement('div');
    projectDiv.setAttribute("id", `projects`);
    projectDiv.classList.add('projectDiv');
    
    projectDiv.appendChild(createLegend());
    projects.list.forEach(element =>{
        projectDiv.appendChild(createProject(element));
    });
    projectDiv.appendChild(addProjectBtn());
    return projectDiv;
}
function createProject(project){
    const element = document.createElement('div');
    const title = document.createElement('h3');
    
    title.innerText = project.title;
    
    element.classList.add('project');
    title.classList.add('projectTitle');
    
    title.addEventListener('click', ()=>{
        selectProject(project.title);
    });
    
    element.appendChild(title);
    return element;
}
function createLegend(){
    const element = document.createElement('div');
    const title = document.createElement('h2');
    
    title.innerText = 'Projects:';
    
    element.classList.add('projectLegendParent');
    title.classList.add('projectLegend');
    element.appendChild(title);
    
    return element;
}
function selectProject(project){
    let projects_ = restore();
    projects_.setCurrentProject(project);
    const content = document.querySelector('#content');
    renderStaticPages(content);
}
function addProjectBtn(){
    const element = document.createElement('div');
    const addProjectBtn = document.createElement('button');

    addProjectBtn.innerText = "Add a Project";

    addProjectBtn.classList.add('addProjectBtn');
    addProjectBtn.addEventListener('click', () => {
        addProjectForm();
    })

    element.appendChild(addProjectBtn);

    return element;
}
function addProjectForm() {
    const element = document.createElement('div');
    const legend = document.createElement('legend');
    const form = document.createElement('form');
    const title = document.createElement('input');
    const button = document.createElement('button');
    
    legend.innerText ="Add a Project:";
    button.innerText = "submit";

    setAttributes(title, {
        'id': 'formProjectTitle',
        'type': 'text',
        'placeholder': 'Enter the project name:',
        'required': 'true'
    });
    button.setAttribute('type', 'submit');
    
    form.onsubmit = addProject;
    
    element.classList.add('projectFormDiv');
    element.setAttribute('id', 'projectFormDiv');
    form.classList.add('projectForm');
    
    form.appendChild(legend);
    form.appendChild(title);
    form.appendChild(button);
    element.appendChild(form);
    document.body.appendChild(element);
    
}
function addProject(e){
    e.preventDefault();
    let projects = restore();
    
    let title = document.getElementById("formProjectTitle");
    projects.addProject(title.value);
    deleteForm();
    const content = document.querySelector('#content');
    renderStaticPages(content);
}
function deleteForm(){
    const element = document.getElementById('projectFormDiv');
    while(element.firstChild){
        element.removeChild(element.lastChild);
    }
    element.remove();
}