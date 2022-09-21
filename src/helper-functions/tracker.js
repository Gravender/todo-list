import { restore } from "../object-handlers/storage";

function currentProject(){
    let projects = restore();
    return projects.locatebyProject(projects.currentProject);
}
export default currentProject;