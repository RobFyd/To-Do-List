{
    let tasks = [];
    let hideDoneTasks = false;

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
        tasks = tasks.map((task, index) => index === taskIndex ? { ...task, done: !task.done } : task);
        render();
    };

    const toggleAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

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

    const renderButtons = () => {

        if (!tasks.length) {
            document.querySelector(".js-buttons").innerHTML = "";
            return;
        }

        document.querySelector(".js-buttons").innerHTML =
            `<button class="button__hideCompleted js-hideCompleted">${hideDoneTasks ? "Show" : "Hide"} completed</button>
            <button class="button__completeAll js-completeAll" disabled>Complete all</button>`;
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