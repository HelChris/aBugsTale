import { switchTheme } from "/js/ui/shared/switchTheme.mjs";
import { applySavedTheme } from "/js/ui/shared/switchTheme.mjs";
import { updateLogo } from "/js/ui/shared/switchLogoToTheme.mjs";

import { fetchAndDisplaySinglePost } from "/js/events/fetchAndDisplaySinglePost.mjs";
import { fetchAndDisplayBlogPosts } from "/js/events/fetchAndDisplayBlogPosts.mjs";

// what JS to run on which page
const { pathname } = location;
console.log(pathname);

switch (pathname) {
	case "/":
	case "/index":
	case "/index.html":
		fetchAndDisplayBlogPosts();
		break;
	case "/story":
	case "/story.html":
		fetchAndDisplaySinglePost();
		break;
	case "/stories":
	case "/stories.html":
		fetchAndDisplayBlogPosts();
		break;
}

//
// EventListeners to update theme and logo on the pages
//
document.addEventListener("DOMContentLoaded", async () => {
	// Apply saved theme
	applySavedTheme();
	updateLogo();

	// Event listener for the theme switcher
	const themeSwitcher = document.querySelector("#theme-switcher");
	if (themeSwitcher) {
		themeSwitcher.addEventListener("click", () => {
			switchTheme();
			updateLogo();
		});

		themeSwitcher.addEventListener("keydown", function (event) {
			// Check if Enter or Space is pressed
			if (event.key === "Enter" || event.key === " ") {
				// Prevent the default action to avoid scrolling the page when pressing Space
				event.preventDefault();
				// Toggle the theme
				switchTheme();
				updateLogo();
			}
		});
	}

	// Event listener for the menu checkbox
	const menuCheckbox = document.getElementById("menu-checkbox");
	const mainNavigation = document.getElementById("main-navigation");

	if (menuCheckbox) {
		// Add change event listener for accessibility
		menuCheckbox.addEventListener("change", function () {
			if (menuCheckbox.checked) {
				menuCheckbox.setAttribute("aria-expanded", "true");
				// Move focus to first focusable element
				const firstFocusableElement = mainNavigation.querySelector("a");
				if (firstFocusableElement) {
					firstFocusableElement.focus();
				}
			} else {
				menuCheckbox.setAttribute("aria-expanded", "false");
				// Move focus back to toggle button
				menuCheckbox.focus();
			}
		});

		// Add keyboard event listener for accessibility
		menuCheckbox.addEventListener("keydown", function (event) {
			// Check if Enter or Space is pressed
			if (event.key === "Enter" || event.key === " ") {
				// Prevent the default action to avoid scrolling when pressing space
				event.preventDefault();
				// Toggle the checkbox state
				menuCheckbox.checked = !menuCheckbox.checked;
				// Dispatch the change event to trigger the change listener
				menuCheckbox.dispatchEvent(new Event("change"));
			}
		});
	}

	// Event listener for the label to toggle the menu
	const menuLabel = document.querySelector(".menu-label");
	if (menuLabel) {
		menuLabel.addEventListener("keydown", function (event) {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				menuCheckbox.checked = !menuCheckbox.checked;
				menuCheckbox.dispatchEvent(new Event("change"));
			}
		});
	}

	// Handle focus styles
	function handleFirstTab(event) {
		if (event.key === "Tab") {
			document.body.classList.add("user-is-tabbing");
			window.removeEventListener("keydown", handleFirstTab);
			window.addEventListener("mousedown", handleMouseDownOnce);
		}
	}

	function handleMouseDownOnce() {
		document.body.classList.remove("user-is-tabbing");
		window.removeEventListener("mousedown", handleMouseDownOnce);
		window.addEventListener("keydown", handleFirstTab);
	}

	window.addEventListener("keydown", handleFirstTab);
});
