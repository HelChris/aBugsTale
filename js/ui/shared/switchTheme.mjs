//switch function
export const switchTheme = () => {
	//get root element and data-theme value
	const rootElm = document.documentElement;
	let dataTheme = rootElm.getAttribute("data-theme"),
		newTheme;

	newTheme = dataTheme === "light" ? "dark" : "light";

	//set the new HTML attribute
	rootElm.setAttribute("data-theme", newTheme);

	//set the new local storage item
	localStorage.setItem("theme", newTheme);
};

//function to apply the saved theme from localstorage on page load
export const applySavedTheme = () => {
	const savedTheme = localStorage.getItem("theme");
	if (savedTheme) {
		document.documentElement.setAttribute("data-theme", savedTheme);
	}
};
