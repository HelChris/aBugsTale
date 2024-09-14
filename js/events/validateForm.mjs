export function initializeFormValidation() {
	const form = document.querySelector("form");
	const name = document.querySelector("#name");
	const email = document.querySelector("#email");
	const subject = document.querySelector("#subject");
	const message = document.querySelector("#message");
	const button = document.querySelector("button");

	const nameCounter = document.createElement("small");
	const subjectCounter = document.createElement("small");
	const messageCounter = document.createElement("small");

	nameCounter.className = "counter";
	subjectCounter.className = "counter";
	messageCounter.className = "counter";

	if (name && name.parentElement) {
		name.parentElement.appendChild(nameCounter);
	}
	if (subject && subject.parentElement) {
		subject.parentElement.appendChild(subjectCounter);
	}
	if (message && message.parentElement) {
		message.parentElement.appendChild(messageCounter);
	}

	function updateCounter(input, counter, minLength) {
		const length = input.value.length;
		counter.textContent = `${length}/${minLength} characters`;
		if (length >= minLength) {
			counter.classList.add("valid");
			counter.classList.remove("invalid");
			input.classList.add("valid");
			input.classList.remove("invalid");
			counter.classList.add("hidden");
		} else {
			counter.classList.add("invalid");
			counter.classList.remove("valid");
			input.classList.add("invalid");
			input.classList.remove("valid");
			counter.classList.remove("hidden");
		}
	}

	function updateEmailValidation(input) {
		if (validateEmail(input.value)) {
			input.classList.add("valid");
			input.classList.remove("invalid");
		} else {
			input.classList.add("invalid");
			input.classList.remove("valid");
		}
	}

	function updateCounters() {
		updateCounter(name, nameCounter, 5);
		updateCounter(subject, subjectCounter, 15);
		updateCounter(message, messageCounter, 25);
		updateEmailValidation(email);
	}

	function checkIfButtonIsDisabled() {
		updateCounters();
		// if all inputs pass validation enable the button
		if (
			checkLength(name.value, 5) &&
			validateEmail(email.value) &&
			checkLength(subject.value, 15) &&
			checkLength(message.value, 25)
		) {
			button.disabled = false;
		} else {
			// disable button
			button.disabled = true;
		}
	}

	// call the same function for each input's keyup event
	name.addEventListener("keyup", checkIfButtonIsDisabled);
	email.addEventListener("keyup", checkIfButtonIsDisabled);
	subject.addEventListener("keyup", checkIfButtonIsDisabled);
	message.addEventListener("keyup", checkIfButtonIsDisabled);

	// function to run when the form is submitted
	function submitForm(event) {
		event.preventDefault();
		// add the success-form class to the form
		form.classList.add("success-form");
		// replace the form content with a thank-you message
		form.innerHTML = `<div class="success-message"><img src="images/success-icon.png" alt="success" class="success-icon"/><p class="success-p">Thank you. Your message has been sent.</p></div>`;
	}
	form.addEventListener("submit", submitForm);

	// function to check if the length of the input value is valid
	function checkLength(value, len) {
		return value.trim().length >= len;
	}

	function validateEmail(email) {
		const regEx = /\S+@\S+\.\S+/;
		return regEx.test(email);
	}

	// initialize counters
	updateCounters();
}
