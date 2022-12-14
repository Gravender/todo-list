import { loadProjectView } from './projectView';
import { loadTaskView } from './taskView';
import { restore } from "../object-handlers/storage";

import loadFooter from './footer';
import loadHeader from './header';
function renderStaticPages(content){
    let projects = restore();
    while (content.firstChild) {
        content.removeChild(content.lastChild);
    }
    content.appendChild(loadHeader());
    content.appendChild(loadProjectView());
    let project = projects.locatebyProject(projects.currentProject);
    let tasks;
    if(project){
        tasks = project.tasks.sort((task1, task2)=>{
            if(task1.dueDate > task2.dueDate){
                return 1;
            }else if(task1.dueDate < task2.dueDate){
                return -1;
            }
            if(task1.priority < task2.priority){
                return 1;
            }else if (task1.priority > task2.priority){
                return -1;
            }
            else{
                return 0;
            }
        });
    }
    else{
        tasks = [];
    }
    content.appendChild(loadTaskView(tasks));
    content.appendChild(loadFooter());
}
export default renderStaticPages;