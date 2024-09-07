import { fetchBlogPostInfo } from "/js/events/fetchBlogPostInfo";
import { displaySinglePost } from "../ui/blogposts/displaySinglePost.mjs";

export async function fetchAndDisplaySinglePost() {
	const search = window.location.search;
	const params = new URLSearchParams(search);
	const id = params.get("id");

	if (!id) {
		document.location.href = "/";
		return;
	}

	try {
		const url = "/wp-json/wp/v2/posts?per_page=13&_embed";
		const posts = await fetchBlogPostInfo(url);
		const post = posts.find((p) => p.id === parseInt(id));

		if (!post) {
			throw new Error("Post not found");
		}

		const singlePostElement = displaySinglePost(post);
		const resultsContainer = document.getElementById("single-story-page");
		resultsContainer.innerHTML = "";
		resultsContainer.appendChild(singlePostElement);
	} catch (error) {
		console.error("Failed to fetch and display the single post:", error);
		const resultsContainer = document.getElementById("single-story.page");
		resultsContainer.innerHTML = "";
		const errorParagraph = document.createElement("p");
		errorParagraph.className = "error-message";
		errorParagraph.textContent = `An error has occurred: "${error.message}`;
		resultsContainer.appendChild(errorParagraph);
  }

  fetchAndDisplaySinglePost();
}
