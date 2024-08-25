export function displayBlogPostCard(post) {
	const div = document.createElement("div");
	div.className = "post-card-wrapper";

	const cardContent = document.createElement("div");
	cardContent.className = "post-card-content";
	div.appendChild(cardContent);

	const imageLink = document.createElement("a");
	imageLink.href = `story.html?id=${post.id}`;
	cardContent.appendChild(imageLink);

	const img = document.createElement("img");
	img.src = post.featuredImage;
	img.className = "featured-image";
	img.alt = post.title;
	imageLink.appendChild(img);

	const title = document.createElement("h2");
	title.textContent = post.title;
	title.className = "blog-post-title";
	cardContent.appendChild(title);

	const excerpt = document.createElement("p");
	excerpt.textContent = post.excerpt;
	excerpt.className = "blog-post-excerpt";
	cardContent.appendChild(excerpt);

	const readMore = document.createElement("a");
	readMore.href = `story.html?id=${post.id}`;
	readMore.className = "read-more-link";
	readMore.textContent = "Read more";
	readMore.setAttribute("aria-label", `Read more about ${post.title}`);
	cardContent.appendChild(readMore);

	return div;
}
