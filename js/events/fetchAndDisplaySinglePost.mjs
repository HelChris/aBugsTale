import { fetchBlogPostInfo } from "/js/events/fetchBlogPostInfo.mjs";
import { displaySinglePost } from "/js/ui/blogposts/displaySinglePost.mjs";

export async function fetchAndDisplaySinglePost() {
	const location = document.location.search;
	const params = new URLSearchParams(location);
	const idCall = params.get("id");

	if (!idCall) {
		document.location.href = "/";
		return;
	}

	try {
		const urlWithId = `/wp-json/wp/v2/posts/${idCall}?_embed`;
		const posts = await fetchBlogPostInfo(urlWithId);

		if (!posts || !Array.isArray(posts)) {
			throw new Error("Posts not found or invalid response format");
		}

		//find the post with matching id
		const post = posts.find((p) => p.id === parseInt(idCall, 10));

		//change the title of the document according to the post
		const postTitle = post.title;
		document.title = `${postTitle} - A Bug's Tale`;

		//update the URL w/post title
		const newUrl = `story.html?title=${encodeURIComponent(postTitle)}`;
		history.pushState(null, document.title, newUrl);

		if (!post) {
			throw new Error("Post not found");
		}

		//use displaysinglepost to ceate post HTML:
		const singlePostElement = displaySinglePost(post);
		const resultsContainer = document.getElementById("single-story-page");
		resultsContainer.innerHTML = "";
		resultsContainer.appendChild(singlePostElement);
	} catch (error) {
		console.error("Failed to fetch and display the single post:", error);
		const resultsContainer = document.getElementById("single-story-page");
		resultsContainer.innerHTML = "";
		const errorParagraph = document.createElement("p");
		errorParagraph.className = "error-message";
		errorParagraph.textContent = `An error has occurred: "${error.message}"`;
		resultsContainer.appendChild(errorParagraph);
	}
}
