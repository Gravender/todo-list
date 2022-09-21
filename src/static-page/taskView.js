export function loadTaskView(tasks){
    const body = document.querySelector('body');

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('tasks');
    
    tasks.forEach(element =>{
        taskDiv.appendChild(createTask(element));
    });
    return taskDiv;
}
function createTask(task){
    const element = document.createElement('div');
    const title = document.createElement('h1');
    const description = document.createElement('p');
    const dueDate = document.createElement('span');
    const priority = document.createElement('span');
    
    title.innerText = task.title;
    description.innerText = task.description;
    dueDate.innerText = task.dueDate;
    priority.innerText = task.priority;
    
    element.classList.add('task');
    title.classList.add('taskTitle');
    description.classList.add('taskDescription');
    dueDate.classList.add('taskDueDate');
    priority.classList.add('taskPriority');
    
    element.appendChild(title);
    element.appendChild(description);
    element.appendChild(dueDate);
    element.appendChild(priority);
    
    return element;
}