import { loadProjectView } from './projectView';
import { loadTaskView } from './taskView';
import { restore } from "../object-handlers/storage";

import loadFooter from './footer';
import loadHeader from './header';
function renderStaticPages(content){
    let projects = restore();
    content.appendChild(loadHeader());
    content.appendChild(loadProjectView());
    content.appendChild(loadTaskView(projects[0].tasks));
    content.appendChild(loadFooter());
}
export default renderStaticPages;