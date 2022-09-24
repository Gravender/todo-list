import setAttributes from "../helper-functions/setAttributes";
import { task } from "../object-handlers/task";
import { format } from 'date-fns';
import { restore } from "../object-handlers/storage";
import renderStaticPages from "./staticPages";
export function loadTaskView(tasks) {
    const body = document.querySelector('body');

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('tasks');
    //taskDiv.appendChild(createLegend());
    tasks.forEach(element => {
        taskDiv.appendChild(createTask(element));
    });
    taskDiv.appendChild(addTaskBtn());
    return taskDiv;
}
function createLegend() {
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
function createTask(task) {
    const element = document.createElement('div');
    const mainTaskDiv = document.createElement('div');
    const checkDiv = document.createElement('div');
    const taskInfoDiv = document.createElement('div');
    const taskButtondiv = document.createElement('div');
    const title = document.createElement('h3');
    const dueDate = document.createElement('span');
    const completed = document.createElement('input');

    title.innerText = task.title;
    dueDate.innerText = task.dueDate;

    element.classList.add('task');
    mainTaskDiv.classList.add('mainTaskDiv');
    checkDiv.classList.add('checkDiv');
    taskInfoDiv.classList.add('taskDiv');
    taskButtondiv.classList.add('taskButtondiv');
    title.classList.add('taskTitle');
    dueDate.classList.add('taskDueDate');
    completed.classList.add('taskCompleted');

    completed.setAttribute('type', 'checkbox');
    if (task.completed) {
        completed.setAttribute('checked', '');
        element.classList.add('completed');
    }

    completed.addEventListener('change', () => {
        if (task.completed) {
            element.classList.remove('completed');
        }
        else {
            element.classList.add('completed');
        }
        let projects = restore();
        projects.updateTask(task, 'completed', !task.completed);
        const content = document.querySelector('#content');
        renderStaticPages(content);
    });
    taskInfoDiv.addEventListener('click', () => {
        let expandedTaskDiv = document.querySelector('#expandedTaskDiv');
        let projects = restore();
        projects.updateTask(task, 'isExpanded', true);
        if (expandedTaskDiv) {
            saveExpandedNotes();
        }
        else {
        }
        const content = document.querySelector('#content');
        renderStaticPages(content);
    });
    element.classList.add(`taskPriority${task.priority}`);
    
    checkDiv.appendChild(completed);
    taskInfoDiv.appendChild(title);
    taskInfoDiv.appendChild(dueDate);
    taskButtondiv.appendChild(editTaskBtn(task));
    taskButtondiv.appendChild(deleteTaskBtn(task));
    mainTaskDiv.appendChild(checkDiv);
    mainTaskDiv.appendChild(taskInfoDiv);
    mainTaskDiv.appendChild(taskButtondiv);
    element.appendChild(mainTaskDiv);
    if (task.isExpanded == true) {
        element.appendChild(expandTask(task));
    }
    return element;
}
function expandTask(target) {
    const element = document.createElement('div');
    const description = document.createElement('p')
    const notes = document.createElement('p');
    const priority = document.createElement('span');

    description.innerText = target.description;
    notes.innerText = target.notes;
    priority.innerText = target.priority;

    element.classList.add('expandedTaskDiv')
    description.classList.add('expandedTaskDescription');
    notes.classList.add('expandedTaskNotes');
    priority.classList.add('expandedTaskPriority');

    element.setAttribute('id', 'expandedTaskDiv');
    notes.addEventListener('click', () => {
        // Toggle contentEditable on button click
        notes.setAttribute('contenteditable', 'true');
    });
    let projects = restore();
    if (!projects.locatebyTask(target)) { renderStaticPages(content); }
    else {
        notes.setAttribute('data-projecttitle', projects.locatebyTask(target).title);
        notes.setAttribute('data-taskindex', projects.locateTask(target));
    }
    notes.setAttribute('id', `expandedTaskNotes`);

    element.appendChild(description);
    element.appendChild(notes);
    element.appendChild(priority);


    return element;
}
function saveExpandedNotes() {
    let projects = restore();
    let notes = document.getElementById(`expandedTaskNotes`);
    let projectTitle = notes.dataset.projecttitle;
    let taskIndex = notes.dataset.taskindex;
    let task = projects.locatebyProject(projectTitle).tasks[taskIndex];
    projects.updateTask(task, 'notes', notes.innerText);
    projects.updateTask(task, 'isExpanded', !task.isExpanded);
}
function deleteTaskBtn(target) {
    const deleteTaskBtn = document.createElement('button');

    deleteTaskBtn.innerText = "Delete";

    deleteTaskBtn.classList.add('deleteTaskBtn');
    deleteTaskBtn.addEventListener('click', () => {
        let projects = restore();
        projects.deleteTask(target);
        const content = document.querySelector('#content');
        while (content.firstChild) {
            content.removeChild(content.lastChild);
        }
        renderStaticPages(content);
    })

    return deleteTaskBtn;
}
function addTaskBtn() {
    const element = document.createElement('div');
    const addTaskBtn = document.createElement('button');

    addTaskBtn.innerText = "Add a Task";

    addTaskBtn.classList.add('addTaskBtn');
    addTaskBtn.addEventListener('click', () => {
        addTaskForm();
    })

    element.appendChild(addTaskBtn);

    return element;
}
function editTaskBtn(task) {
    const element = document.createElement('div');
    const addTaskBtn = document.createElement('button');

    addTaskBtn.innerText = "edit";

    addTaskBtn.classList.add('editTaskBtn');
    addTaskBtn.addEventListener('click', () => {
        editTaskForm(task);
    })

    element.appendChild(addTaskBtn);

    return element;
}
function addTaskForm() {
    const element = document.createElement('div');
    const legend = document.createElement('legend');
    const form = document.createElement('form');
    const title = document.createElement('input');
    const description = document.createElement('input');
    const dueDate = document.createElement('input');
    const priority = document.createElement('input');
    const button = document.createElement('button');

    legend.innerText = "Add a Task:";
    button.innerText = "submit";

    setAttributes(title, {
        'id': 'formTaskTitle',
        'type': 'text',
        'placeholder': 'Enter the task name:',
        'required': 'true'
    });
    setAttributes(description, {
        'id': 'formTaskDescription',
        'type': 'text',
        'placeholder': 'Can add a description',
        'required': 'false'
    });
    setAttributes(dueDate, {
        'id': 'formTaskDueDate',
        'type': 'date',
        'required': 'true'
    });
    setAttributes(priority, {
        'id': 'formTaskPriority',
        'type': 'number',
        'required': 'true',
        'min': '1',
        'max': '5'
    });
    button.setAttribute('type', 'submit');

    form.onsubmit = addTask;

    element.classList.add('taskFormDiv');
    element.setAttribute('id', 'taskFormDiv');
    form.classList.add('taskForm');

    form.appendChild(legend);
    form.appendChild(createFormItemDiv(title));
    form.appendChild(createFormItemDiv(description));
    form.appendChild(createFormItemDiv(dueDate));
    form.appendChild(createFormItemDiv(priority));
    form.appendChild(button);
    element.appendChild(form);
    document.body.appendChild(element);

}
function editTaskForm(task) {
    const element = document.createElement('div');
    const legend = document.createElement('legend');
    const form = document.createElement('form');
    const title = document.createElement('input');
    const description = document.createElement('input');
    const dueDate = document.createElement('input');
    const priority = document.createElement('input');
    const button = document.createElement('button');

    legend.innerText = `Edit: ${task.title}`;
    title.value = task.title;
    description.value = task.description;
    dueDate.value = task.dueDate;
    priority.value = task.priority;
    button.innerText = "submit";

    setAttributes(title, {
        'id': 'formTaskTitle',
        'type': 'text',
        'required': 'true'
    });
    setAttributes(description, {
        'id': 'formTaskDescription',
        'type': 'text',
        'required': 'false'
    });
    setAttributes(dueDate, {
        'id': 'formTaskDueDate',
        'type': 'date',
        'required': 'true'
    });
    setAttributes(priority, {
        'id': 'formTaskPriority',
        'type': 'number',
        'required': 'true',
        'min': '1',
        'max': '5'
    });
    button.setAttribute('type', 'submit');

    form.onsubmit = updateTask;
    let projects = restore();
    element.setAttribute('data-projecttitle', projects.locatebyTask(task).title);
    element.setAttribute('data-taskindex', projects.locateTask(task));
    element.classList.add('taskFormDiv');
    element.setAttribute('id', 'taskFormDiv');
    form.classList.add('taskForm');

    form.appendChild(legend);
    form.appendChild(createFormItemDiv(title));
    form.appendChild(createFormItemDiv(description));
    form.appendChild(createFormItemDiv(dueDate));
    form.appendChild(createFormItemDiv(priority));
    form.appendChild(button);
    element.appendChild(form);
    document.body.appendChild(element);

}
function createFormItemDiv(target) {
    const element = document.createElement('div');
    element.classList.add('taskFormItem');
    element.appendChild(target);
    return element;
}
function addTask(e) {
    e.preventDefault();
    let projects = restore();

    let title = document.getElementById("formTaskTitle");
    let description = document.getElementById("formTaskDescription");
    let dueDate = document.getElementById("formTaskDueDate");
    let priority = document.getElementById("formTaskPriority");
    projects.insertTask(new task(title.value, description.value, dueDate.value, Number(priority.value)));
    deleteForm();
    const content = document.querySelector('#content');
    renderStaticPages(content);
}
function updateTask(e) {
    e.preventDefault();
    let projects = restore();

    let title = document.getElementById("formTaskTitle");
    let description = document.getElementById("formTaskDescription");
    let dueDate = document.getElementById("formTaskDueDate");
    let priority = document.getElementById("formTaskPriority");
    let form = document.getElementById(`taskFormDiv`);
    let projectTitle = form.dataset.projecttitle;
    let taskIndex = form.dataset.taskindex;
    let task = projects.locatebyProject(projectTitle).tasks[taskIndex];
    projects.updateTask(task, 'title', title.value);
    projects.updateTask(task, 'description', description.value);
    projects.updateTask(task, 'dueDate', dueDate.value);
    projects.updateTask(task, 'priority', Number(priority.value));
    deleteForm();
    const content = document.querySelector('#content');
    renderStaticPages(content);
}
function deleteForm() {
    const element = document.getElementById('taskFormDiv');
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
    element.remove();
}