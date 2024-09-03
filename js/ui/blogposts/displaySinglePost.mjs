// How to display each single story - layout of the page





// import { fetchPostById } from "/js/events/fetchPostsById.mjs";
// import { fetchBlogPostInfo } from "../../events/fetchBlogPostInfo.mjs";

// function showCorrectPageName(targetElement, post) {
// 	const { title } = post;
// 	document.title = `${title} | ${document.title}`;
// }

// export async function displaySinglePost() {
// 	const search = window.location.search;
// 	const params = new URLSearchParams(search);
// 	const id = params.get("id");

// 	if (!id) {
// 		document.location.href = "/";
// 		return;
// 	}

// 	try {
// 		const post = await fetchPostById(id);
// 		showCorrectPageName(document.querySelector("#single-story-page"), post);

// 		const resultsContainer = document.querySelector("#single-story-page");
// 		resultsContainer.innerHTML = "";

// 		const section = document.createElement("section");
// 		section.classNAme = "singe-story-section";
// 		resultsContainer.appendChild(section);

// 		const storyContent = document.createElement("div");
// 		storyContent.className = "story-content";
// 		section.appendChild(storyContent);

// 		const img = document.createElement("img");
// 		img.src = post.featuredImage;
// 		img.className = "featured-image";
// 		img.alt = post.title;
// 		storyContent.appendChild(img);

// 		const title = document.createElement("h1");
// 		title.textContent = post.title;
// 		title.className = "blog-post-title";
// 		storyContent.appendChild(title);

// 		const story = document.createElement("p");
// 		story.textContent = post.content;
// 		story.className = "blog-post";
// 		storyContent.appendChild(story);

// 		const allOurStories = document.createElement("div");
// 		allOurStories.className = "link-button";
// 		storyContent.appendChild(allOurStories);

// 		const allOurStoriesLink = document.createElement("a");
// 		allOurStoriesLink.href = `stories.html`;
// 		allOurStoriesLink.textContent = "Take me to all the stories";
// 		allOurStoriesLink.setAttribute(
// 			"aria-label",
// 			`Go to page with all our stories`
// 		);
// 		allOurStoriesLink.appendChild(allOurStories);

// 		const readAboutUs = document.createElement("div");
// 		readAboutUs.className = "link-button";
// 		storyContent.appendChild(readAboutUs);

// 		const readAboutUsLink = document.createElement("a");
// 		readAboutUsLink.href = `about.html`;
// 		readAboutUsLink.textContent = "About us";
// 		readAboutUsLink.setAttribute("aria-label", `Read about us`);
// 		readAboutUsLink.appendChild(readAboutUs);
// 	} catch (error) {
// 		console.error(error);
// 		const resultsContainer = document.querySelector("#single-story-page");
// 		resultsContainer.innerHTML = "";
// 		const errorParagraph = document.createElement("p");
// 		errorParagraph.className = "error-message";
// 		errorParagraph.textContent = `An error has occured: "${error.message}"`;
// 		resultsContainer.appendChild(errorParagraph);
// 	}
// }
