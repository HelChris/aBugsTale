export function displaySinglePost(post) {
	// main container
	const singleStoryPage = document.createElement("div");
	singleStoryPage.id = "single-story-page";
	singleStoryPage.className = "single-story-page";

	// //spinner
	// const spinner = document.createElement("div");
	// spinner.className = "spinner";
	// singleStoryPage.appendChild(spinner);

	// //loading text
	// const loadingText = document.createElement("p");
	// loadingText.textContent = "Loading..";
	// singleStoryPage.appendChild(loadingText);

	//story wrapper (around the story itself)
	const singleStoryWrapper = document.createElement("div");
	singleStoryWrapper.className = "single-story-wrapper";

	//story image
	const img = document.createElement("img");
	img.src = post.featuredImage;
	img.alt = post.title;
	img.className = "story-image";
	singleStoryWrapper.appendChild(img);

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
	storyWrapper.className = "story-wrapper story-background";

	//the story itself
	const storyParagraph = document.createElement("p");
	storyParagraph.className = "the-story";
	storyParagraph.textContent = post.content;
	storyWrapper.appendChild(storyParagraph);

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
