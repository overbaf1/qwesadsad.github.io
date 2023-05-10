// Setting up all variables

let theInput = document.querySelector(".add-task input");
let theAddButton = document.querySelector(".add-task .plus");
let taskContainer = document.querySelector(".tasks-content");
let tasksCount = document.querySelector(".tasks-count span");
let taskCompleted = document.querySelector(".tasks-completed span");

// Make focus on input field on window loading

window.onload = function () {
	theInput.focus();
};

// Adding a task

theAddButton.onclick = function () {
	// check if input is empty or not
	if (theInput.value === "") {
		Swal.fire("There is no input value!");
	} else {
		let noTasksMsg = document.querySelector(".no-tasks-message");
		// check if span NO TASK Message is exist
		if (document.body.contains(document.querySelector(".no-tasks-message"))) {
			// Remove no tasks message span from the html document
			noTasksMsg.remove();
		}
		// Create another span Element to add our new input value to it
		let mainSpan = document.createElement("span");
		// Create a text node with our input value
		let text = document.createTextNode(theInput.value);
		// Add text to the new span element
		mainSpan.appendChild(text);
		// Add the newly created span Element instead of the deleted old message(to our container)
		taskContainer.appendChild(mainSpan);
		// Add attribute to the main span element
		mainSpan.setAttribute("class", "task-box");
		// Create delete span Element
		let deleteElement = document.createElement("span");
		// Create text node and attach it to the delete Element
		let deleteText = document.createTextNode("Delete");
		deleteElement.appendChild(deleteText);
		// Adding delete Element to our main span Element
		mainSpan.appendChild(deleteElement);
		// Add a class attribute to the delete element
		deleteElement.setAttribute("class", "delete");

		theInput.value = "";
		theInput.focus();
		calculateTasks();
	}
};

// As the delete element is created dynamicaly, then we gonna use event listner to add click event on it, let us see how we are going to select the delete element

document.addEventListener("click", function (e) {
	// Delete Task
	if (e.target.className == "delete") {
		// delete current task
		e.target.parentNode.remove();
		// check number of tasks inside the container
		if (taskContainer.childElementCount == 0) {
			createTaskNo();
		}
		// Calculate Tasks
		calculateTasks();
	}

	//Finish Task; we gonna use classList and contain to locate the target class name, as there are several one, and toggle will not work using the previous locating method
	if (e.target.classList.contains("task-box")) {
		// Toggle Class with name of "finished"
		e.target.classList.toggle("finished");
	}
	// Calculate Tasks
	calculateTasks();
});

// Function to create number of tasks message

function createTaskNo() {
	// create message span element
	let msgSpan = document.createElement("span");
	// create the text message
	let msgText = document.createTextNode("No Tasks To Show");
	// Add text oo message span Element
	msgSpan.appendChild(msgText);
	// Add class to message span
	msgSpan.className = "no-tasks-message";
	// Append the message span element to the task container
	taskContainer.appendChild(msgSpan);
}

// function to calculate tasks
function calculateTasks() {
	// calculate all tasks
	tasksCount.innerText = document.querySelectorAll(
		".tasks-content .task-box"
	).length;
	// calculate completed tasks
	taskCompleted.innerText = document.querySelectorAll(
		".tasks-content .finished"
	).length;
}
