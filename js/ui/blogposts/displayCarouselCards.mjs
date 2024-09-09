import { fetchBlogPostInfo } from "/js/events/fetchBlogPostInfo.mjs";

export async function createCarouselCards(url) {
	try {
		const posts = await fetchBlogPostInfo(url);
		const cardWrapper = document.querySelector(".card-list");
    cardWrapper.innerHTML = "";

    console.log(`Number of slides: ${posts.length}`);

		posts.forEach((post) => {
			const cardItem = document.createElement("li");
			cardItem.className = "card-item swiper-slide";

			const cardLink = document.createElement("a");
			cardLink.className = "card-link";
			cardLink.href = `story.html?id=${post.id}`;

			const cardImage = document.createElement("img");
			cardImage.className = "card-image featured-image";
			cardImage.src = post.featuredImage;
			cardImage.alt = post.title;

			const badge = document.createElement("p");
			badge.className = "badge date";
			const formattedDate = new Date(post.date)
				.toLocaleDateString("en-GB")
				.replace(/\//g, ".");
			badge.textContent = `Posted: ${formattedDate}`;

			const cardTitle = document.createElement("h2");
			cardTitle.className = "card-title";
			cardTitle.textContent = post.title;

			const cardP = document.createElement("p");
			cardP.className = "card-p";
			cardP.textContent = post.excerpt;

			cardLink.appendChild(cardImage);
			cardLink.appendChild(badge);
			cardLink.appendChild(cardTitle);
			cardLink.appendChild(cardP);

			cardItem.appendChild(cardLink);
			cardWrapper.appendChild(cardItem);
		});
	} catch (error) {
		console.error("failed to create carousel cards:", error);
	}
}
