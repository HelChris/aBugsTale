import { switchTheme } from "/js/ui/shared/switchTheme.mjs";
import { applySavedTheme } from "/js/ui/shared/switchTheme.mjs";
import { updateLogo } from "/js/ui/shared/switchLogoToTheme.mjs";

import { fetchAndDisplaySinglePost } from "/js/events/fetchAndDisplaySinglePost.mjs";
import { fetchAndDisplayBlogPosts } from "/js/events/fetchAndDisplayBlogPosts.mjs";

import { createCarouselCards } from "/js/ui/blogPosts/displayCarouselCards.mjs";
import { initializeFormValidation } from "/js/events/validateForm.mjs";

// what JS to run on which page
const { pathname } = location;

switch (pathname) {
	case "/":
	case "/index":
	case "/index.html":
		createCarouselCards();
		break;
	case "/story":
	case "/story.html":
		fetchAndDisplaySinglePost();
		break;
	case "/stories":
	case "/stories.html":
		fetchAndDisplayBlogPosts();
		break;
	case "/about":
	case "/about.html":
		createCarouselCards();
		break;
	case "/contact":
	case "/contact.html":
		initializeFormValidation();
		break;
}

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

	// Event listener for the menu button
	const menuButton = document.getElementById("menu-button");
	const mainNavigation = document.getElementById("main-navigation");

	if (menuButton) {
		// Add change event listener for accessibility
		menuButton.addEventListener("click", function () {
			const expanded = menuButton.getAttribute("aria-expanded") === "true";
			menuButton.setAttribute("aria-expanded", !expanded);
			// Move focus to first focusable element
			if (!expanded) {
				const firstFocusableElement = mainNavigation.querySelector("a");
				if (firstFocusableElement) {
					firstFocusableElement.focus();
				}
			} else {
				//move focus back to toggle button
				menuButton.focus();
			}
		});

		// Add keyboard event listener for accessibility
		menuButton.addEventListener("keydown", function (event) {
			// Check if Enter or Space is pressed
			if (event.key === "Enter" || event.key === " ") {
				// Prevent the default action to avoid scrolling when pressing space
				event.preventDefault();
				// toggle button state
				menuButton.click();
			}
		});
	}
	// handle focus styles
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