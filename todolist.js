document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const taskCategory = document.getElementById('task-category');
    const categoryButtons = document.querySelectorAll('.category-button');

    loadTasks();

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const newTaskInput = document.getElementById('new-task');
        const newTaskText = newTaskInput.value.trim();
        const category = taskCategory.value;

        if (newTaskText === '') {
            return;
        }

        const newTask = {
            text: newTaskText,
            category: category
        };

        addTaskToDOM(newTask);
        saveTask(newTask);

        newTaskInput.value = '';
    });

    categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterTasks(button.getAttribute('data-category'));
        });
    });

    function addTaskToDOM(task) {
        const newTaskElement = document.createElement('li');
        newTaskElement.textContent = task.text;
        newTaskElement.setAttribute('data-category', task.category);

        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = 'X';
        deleteBtn.classList.add('delete');
        deleteBtn.addEventListener('click', function () {
            taskList.removeChild(newTaskElement);
            removeTask(task.text);
        });

        newTaskElement.appendChild(deleteBtn);
        taskList.appendChild(newTaskElement);
    }

    function saveTask(task) {
        let tasks = getTasksFromLocalStorage();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = getTasksFromLocalStorage();
        tasks.forEach(task => {
            addTaskToDOM(task);
        });
    }

    function getTasksFromLocalStorage() {
        let tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    function removeTask(taskText) {
        let tasks = getTasksFromLocalStorage();
        tasks = tasks.filter(task => task.text !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function filterTasks(category) {
        const tasks = document.querySelectorAll('#task-list li');
        tasks.forEach(task => {
            if (category === 'all' || task.getAttribute('data-category') === category) {
                task.style.display = '';
            } else {
                task.style.display = 'none';
            }
        });
    }
});
