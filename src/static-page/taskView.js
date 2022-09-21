export function loadTaskView(tasks){
    const body = document.querySelector('body');

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('tasks');
    taskDiv.appendChild(legend());
    tasks.forEach(element =>{
        taskDiv.appendChild(createTask(element));
    });
    return taskDiv;
}
function legend(){
    const element = document.createElement('div');
    const title = document.createElement('h2');
    const description = document.createElement('h2');
    const dueDate = document.createElement('h2');
    const priority = document.createElement('h2');
    const completed = document.createElement('h2');
    
    title.innerText = 'Title:';
    description.innerText = 'Description:';
    dueDate.innerText = 'Due date:';
    priority.innerText = 'Priority:';
    completed.innerText = 'Completion Status:';
    
    element.classList.add('taskLegendParent');
    title.classList.add('taskLegend');
    description.classList.add('taskLegend');
    dueDate.classList.add('taskLegend');
    priority.classList.add('taskLegend');
    completed.classList.add('taskLegend');
    
    element.appendChild(title);
    element.appendChild(description);
    element.appendChild(dueDate);
    element.appendChild(priority);
    element.appendChild(completed);
    
    return element;
}
function createTask(task){
    const element = document.createElement('div');
    const title = document.createElement('h3');
    const description = document.createElement('p');
    const dueDate = document.createElement('span');
    const priority = document.createElement('span');
    const completed = document.createElement('input');
    
    title.innerText = task.title;
    description.innerText = task.description;
    dueDate.innerText = task.dueDate;
    priority.innerText = task.priority;
    
    element.classList.add('task');
    title.classList.add('taskTitle');
    description.classList.add('taskDescription');
    dueDate.classList.add('taskDueDate');
    priority.classList.add('taskPriority');
    completed.classList.add('taskCompleted');
    
    completed.setAttribute('type', 'checkbox');
    if(task.completed){
        completed.setAttribute('checked', '');
        element.classList.add('completed');
    }
    
    completed.addEventListener('change', ()=>{
        if(task.completed){
            element.classList.remove('completed');
        }
        else{
            element.classList.add('completed');
        }
        task.completed = !task.completed;
        
    })
    
    element.appendChild(title);
    element.appendChild(description);
    element.appendChild(dueDate);
    element.appendChild(priority);
    element.appendChild(completed);
    
    return element;
}