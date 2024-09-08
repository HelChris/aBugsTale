import { fetchBlogPostInfo } from "/js/events/fetchBlogPostInfo.mjs";

export async function createModalImage(imgElement) {
	// modal container
	const modal = document.createElement("div");
	modal.className = "modal";
	document.body.appendChild(modal);

	// create modal image
	const modalImg = document.createElement("img");
	modalImg.className = "modal-content";
	modal.appendChild(modalImg);

	// event listener to open modal
	imgElement.addEventListener("click", () => {
		modal.style.display = "block";
		modalImg.src = imgElement.src;
		modalImg.alt = imgElement.alt;
	});

	// event listener to close modal
	modal.addEventListener("click", (event) => {
		if (event.target === modal) {
			modal.style.display = "none";
		}
	});
}

export function displaySinglePost(post) {
	// main container
	const singleStoryPage = document.createElement("div");
	singleStoryPage.id = "single-story-page";
	singleStoryPage.className = "single-story-page";

	//story wrapper (around the story itself)
	const singleStoryWrapper = document.createElement("div");
	singleStoryWrapper.className = "single-story-wrapper single-post-story";

	//story image
	const img = document.createElement("img");
	img.src = post.featuredImage;
	img.alt = post.title;
	img.className = "story-image";
	singleStoryWrapper.appendChild(img);

	//create modal image
	createModalImage(img);

	//title
	const title = document.createElement("h1");
	title.textContent = post.title;
	title.className = "story-title";
	singleStoryWrapper.appendChild(title);

	//author
	const author = document.createElement("p");
	author.textContent = `By author: ${post.author}`;
	author.className = "story-author";
	singleStoryWrapper.appendChild(author);

	//date
	const date = document.createElement("p");
	date.className = "date";
	const formattedDate = new Date(post.date)
		.toLocaleDateString("en-GB")
		.replace(/\//g, ".");
	date.textContent = `Posted: ${formattedDate}`;
	singleStoryWrapper.appendChild(date);

	//storywrapper w/background
	const storyWrapper = document.createElement("div");
	storyWrapper.classList.add("story-wrapper", "story-background");

	//render storycontent with paragraphs
	const contentWrapper = document.createElement("div");
	if (Array.isArray(post.content)) {
		post.content.forEach((paragraph) => {
			const paragraphElement = document.createElement("p");
			paragraphElement.innerHTML = paragraph;
			paragraphElement.classList.add("story-paragraph");
			contentWrapper.appendChild(paragraphElement);
		});
	} else {
		console.error("Post content is not an array:", post.conent);
	}
	storyWrapper.appendChild(contentWrapper);

	// //render the story content with paragraphs
	// const contentWrapper = document.createElement("div");
	// fetchBlogPostInfo.content.forEach((paragraph) => {
	// 	const paragraphElement = document.createElement("p");
	// 	paragraphElement.innerHTML = paragraph;
	// 	contentWrapper.appendChild(paragraphElement);
	// });
	// storyWrapper.appendChild(contentWrapper);

	// //the story itself
	// const storyParagraph = document.createElement("p");
	// storyParagraph.className = "the-story";
	// storyParagraph.textContent = post.content;
	// storyWrapper.appendChild(storyParagraph);

	//append story-wrapper to single-story-wrapper
	singleStoryWrapper.appendChild(storyWrapper);

	//link button
	const linkButton = document.createElement("a");
	linkButton.href = "/stories.html";
	linkButton.className = "button";
	linkButton.textContent = "Back to Stories";
	singleStoryWrapper.appendChild(linkButton);

	//append single story-wrapper to main container
	singleStoryPage.appendChild(singleStoryWrapper);

	//return main container
	return singleStoryPage;
}
