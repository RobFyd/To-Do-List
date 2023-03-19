{
    let tasks = [];
    let hiddenDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks, { content: newTaskContent },
        ];

        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const toggleAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const toggleHiddenTasksDone = () => {
        hiddenDoneTasks = !hiddenDoneTasks;
        render();
    };

    const bindRemoveEvents = () => {
        if (!tasks.length) {
            return;
        };

        const removeTasksButton = document.querySelector(".js-completeAll");

        removeTasksButton.addEventListener("click", () => {
            toggleAllTasksDone();
        });

    };

    const bindButtonsEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });

        if (!tasks.length) {
            return;
        } else {
            const removeTasksButton = document.querySelector(".js-completeAll");

            removeTasksButton.addEventListener("click", () => {
                toggleAllTasksDone();
            });
        };

        const hiddenTasksButton = document.querySelector(".js-hideCompleted");

        hiddenTasksButton.addEventListener("click", toggleHiddenTasksDone);
    };

    const renderButtons = () => {

        if (!tasks.length) {
            document.querySelector(".js-buttons").innerHTML = "";
            return;
        }

        document.querySelector(".js-buttons").innerHTML = `
            <button class="button__hideCompleted js-hideCompleted">${hiddenDoneTasks ? "Show" : "Hide"} completed</button>

            <button class="button__completeAll js-completeAll" ${tasks.every(({ done }) => done) ? "disabled" : ""} >Complete all</button>
            `;
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="tasks__item ${task.done && hiddenDoneTasks ? "tasks__item--hidden" : ""}">

                <button class="task__done task__done--active js-done">${task.done ? "✔" : ""}</button>

                <span class="task__content ${task.done ? "task__content--done" : ""}">${task.content}</span>

                <button class="task__remove task__remove--active js-remove">🗑</button>
                    </li>
            `;
        };
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindButtonsEvents();
        bindRemoveEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
        };

        newTaskElement.focus();
        newTaskElement.value = "";
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}