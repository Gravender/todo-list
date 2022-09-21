
class Projects {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    };
    addTask(task) {
        this.tasks.push(task);
    };
}
export { Projects }