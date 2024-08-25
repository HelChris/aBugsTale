import { switchTheme } from "./ui/shared/switchTheme.mjs";
import { applySavedTheme } from "./ui/shared/switchTheme.mjs";
import { updateLogo } from "./ui/shared/switchLogoToTheme.mjs";

import { fetchBlogPostInfo } from "/js/events/fetchBlogPostInfo.mjs";
import { displayBlogPostCard } from "/js/ui/blogposts/displayBlogPostCards.mjs";
import { displaySinglePost } from "/js/ui/blogposts/displaySinglePost.mjs";
import {} from "/js/ui/shared/switchLogoToTheme.mjs";
import { displayCarousel } from "./ui/blogposts/displayCarousel.mjs";

const { pathname } = location;
console.log(pathname);

switch (pathname) {
	case "/":
	case "/index.html":
		displayCarousel();
		// display carousel();
		// display blogpostCards();
		break;
	case "/story.html":
		displaySinglePost();
		break;
	case "/stories.html":
		// display blogpostcards();
		break;
}

document.addEventListener("DOMContentLoaded", async () => {
	// Apply saved theme
	applySavedTheme();
	updateLogo();

	// Fetch and display blog posts
	const url = "/wp-json/wp/v2/posts?per_page=13&_embed"; // Your API endpoint
	const blogPosts = await fetchBlogPostInfo(url);
	const postsContainer = document.getElementById("posts-container");
	if (postsContainer) {
		blogPosts.forEach((post) => {
			const card = displayBlogPostCard(post);
			postsContainer.appendChild(card);
		});
	}

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
});
