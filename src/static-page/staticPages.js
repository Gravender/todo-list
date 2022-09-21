import { loadProjectView } from './projectView';
import { loadTaskView } from './taskView';
import { restore } from "../object-handlers/storage";
import { compareAsc, format } from 'date-fns';

import loadFooter from './footer';
function renderStaticPages(content){
    let projects = restore();
    content.appendChild(loadProjectView());
    content.appendChild(loadTaskView(projects[0].tasks));
    content.appendChild(loadFooter());
}
export default renderStaticPages;