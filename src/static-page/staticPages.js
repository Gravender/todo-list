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
    content.appendChild(loadTaskView(projects.locatebyProject(projects.currentProject).tasks));
    content.appendChild(loadFooter());
}
export default renderStaticPages;