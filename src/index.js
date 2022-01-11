import { print } from "./utils/utils";
import "./styles/index.css";
import "./styles/test.scss";

print("Sourav Modak");

// DOM constants
const taskInput = document.querySelector("#create-container > input");
const createBtn = document.querySelector("#create-container > button");
const taskList = document.getElementById("tasks");
const resetBtn = document.getElementById("reset-btn");

createBtn.addEventListener("click", createHandler);
resetBtn.addEventListener("click", resetHandler);

document.onkeydown = function (evt) {
	const { key } = evt;
	switch (key) {
		case "Enter":
			return createHandler();
		default:
			return null;
	}
};

function createCheckbox(action) {
	const checkbox = document.createElement("input");
	checkbox.setAttribute("type", "checkbox");
	checkbox.setAttribute("name", action);
	return checkbox;
}

function createButton(action, text) {
	const button = document.createElement("button");
	button.setAttribute("name", action);
	button.innerText = text;
	return button;
}

function createContainer(className, ...childs) {
	const container = document.createElement("div");
	container.className = className;
	container.append(...childs);
	return container;
}

function createListItem(taskId, className, ...childs) {
	const li = document.createElement("li");
	li.setAttribute("id", taskId);
	li.className = className;
	li.append(...childs);
	return li;
}

function createTask(taskName, taskId) {
	const statusCheckbox = createCheckbox("status");
	const textNode = document.createTextNode(taskName);
	const text = document.createElement("span");
	text.append(textNode);
	const taskContainer = createContainer("content", statusCheckbox, text);
	const editBtn = createButton("edit", "Edit");
	const deleteBtn = createButton("delete", "Delete");
	const actionContainer = createContainer("actions", editBtn, deleteBtn);
	const newTask = createListItem(
		taskId,
		"task",
		taskContainer,
		actionContainer
	);
	return newTask;
}

function createHandler() {
	const taskName = taskInput.value;
	if (!taskName) return;
	const childCount = taskList.children.length;
	const taskId = `task-${childCount}`;
	const newTask = createTask(taskName, taskId);
	taskList.append(newTask);
	taskInput.value = "";
}

function resetHandler() {
	while (taskList.lastChild) {
		taskList.lastChild.remove();
	}
}

function statusHandler(el, isDone) {
	const textEl = el.firstChild.querySelector("span");
	const classes = textEl.classList;
	if (isDone) classes.add("done");
	else classes.remove("done");
}

function editHandler(el) {
	const originalText = el.firstChild.innerText;
	const input = document.createElement("input");
	input.setAttribute("value", originalText);
	const button = createButton("edit-done", "Done");
	el.firstChild.replaceWith(input);
	el.lastChild.replaceWith(button);
	el.classList.add("edit-task");
}

function editDoneHandler(el) {
	const textValue = el.querySelector("input").value;
	const editedTask = createTask(textValue, el.id);
	el.replaceWith(editedTask);
}

function deleteHandler(el) {
	taskList.removeChild(el);
}

taskList.addEventListener("click", (evt) => {
	const {
		target: { name, checked },
		path,
	} = evt;

	let element;
	for (let i = 0; i < path.length; i++) {
		const el = path[i];
		if (el.tagName === "LI" && el.classList.contains("task")) {
			element = el;
		}
	}

	switch (name) {
		case "status":
			return statusHandler(element, checked);
		case "edit":
			return editHandler(element);
		case "edit-done":
			return editDoneHandler(element);
		case "delete":
			return deleteHandler(element);
		default:
			return null;
	}
});
