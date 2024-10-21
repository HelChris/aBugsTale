import { fetchBlogPostInfo } from "/js/events/fetchBlogPostInfo.mjs";
import { displayBlogPostCard } from "/js/ui/blogPosts/displayBlogPostCards.mjs";

export async function fetchAndDisplayBlogPosts() {
	// Fetch and display blog posts in posts container
	const url = "/wp-json/wp/v2/posts?per_page=13&_embed"; // All the 13 posts+
	const blogPosts = await fetchBlogPostInfo(url);
	const postsContainer = document.getElementById("posts-container");
	postsContainer.className = "post-grid-container";

	if (postsContainer) {
		// display 10 first posts
		const initialPosts = blogPosts.slice(0, 10);
		initialPosts.forEach((post) => {
			const card = displayBlogPostCard(post);
			postsContainer.appendChild(card);
		});

		// create "load more" button
		const loadMoreButton = document.createElement("button");
		loadMoreButton.textContent = "Load More Stories";
		loadMoreButton.className = "button";
		loadMoreButton.addEventListener("click", () => {
			//display the rest of the posts
			const remainingPosts = blogPosts.slice(10);
			remainingPosts.forEach((post) => {
				const card = displayBlogPostCard(post);
				postsContainer.appendChild(card);
			});
			// hide button after loading all posts
			loadMoreButton.style.display = "none";

			//re-append the top-button container so it stays at the bottom
			postsContainer.appendChild(topButtonContainer);
		});

		// container to load-more button
		const loadMoreButtonContainer = document.createElement("div");
		loadMoreButtonContainer.className = "button-container";
		loadMoreButtonContainer.appendChild(loadMoreButton);
		postsContainer.appendChild(loadMoreButtonContainer);

		// take me to the top button
		const topButton = document.createElement("button");
		topButton.textContent = "Take me to the Top";
		topButton.classList.add("button", "top-button");
		topButton.addEventListener("click", () => {
			window.scrollTo({ top: 0, behavior: "smooth" });
		});

		//container to top-button
		const topButtonContainer = document.createElement("div");
		topButtonContainer.className = "button-container";
		topButtonContainer.appendChild(topButton);
		postsContainer.appendChild(topButtonContainer);
	}
}