import { loadTaskView } from "./taskView";
import { restore } from '../object-handlers/storage'
export function loadProjectView(){
    let projects = restore();
    const projectDiv = document.createElement('div');
    projectDiv.setAttribute("id", `projects`);
    projectDiv.classList.add('projectDiv');
    
    
    projects.forEach(element =>{
        projectDiv.appendChild(createProject(element));
    });
    return projectDiv;
}
function createProject(project){
    const element = document.createElement('div');
    const title = document.createElement('h1');
    
    title.innerText = project.title;
    
    element.classList.add('project');
    title.classList.add('projectTitle');
    
    element.appendChild(title);
    return element;
}