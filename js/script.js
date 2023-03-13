{
    let tasks = [];
    let hideDoneTasks = false;    //przycisk do ukrycia wszystkich zadan ukonczonych

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    }

    const toggleTaskDone = (taskIndex) => {
        //tasks = tasks.map
        tasks[taskIndex].done = !tasks[taskIndex].done
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderTasks = () => {
        let htmlString = "";

        //li class = tasks__item--hidden

        for (const task of tasks) {
            htmlString += `
                <li class="tasks__item">

                <button class="task__done task__done--active js-done">${task.done ? "✔" : ""}</button>

                <span class="task__content${task.done ? " task__content--done" : ""}">${task.content}</span>

                <button class="task__remove task__remove--active js-remove">🗑</button>
                    </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => { };

    const bindButtonsEvents = () => { }; // event listener for buttons, dac if bo przyciski raz sa a raz nie

    const render = () => {
        renderTasks();
        renderButtons();
        bindButtonsEvents();
        bindEvents();
        bindToggleDoneEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}