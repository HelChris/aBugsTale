import { fetchBlogPostInfo } from "/js/events/fetchBlogPostInfo.mjs";

export async function createCarouselCards(url) {
	try {
		const posts = await fetchBlogPostInfo(url);
		const cardWrapper = document.querySelector(".card-list");
		cardWrapper.innerHTML = "";

		const latestPosts = posts
			.sort((a, b) => new Date(b.date) - new Date(a.date))
			.slice(0, 6);

		latestPosts.forEach((post) => {
			const cardItem = document.createElement("li");
			cardItem.className = "card-item";

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
		initializeCarousel();
	} catch (error) {
		console.error("failed to create carousel cards:", error);
	}
}

function initializeCarousel() {
	let currentIndex = 0;

	const cardWrapper = document.querySelector(".card-list");
	const items = document.querySelectorAll(".card-item");
	const itemWidth = items[0].offsetWidth + 20;
	const visibleItems = Math.floor(
		cardWrapper.parentElement.offsetWidth / itemWidth
	);
	const maxIndex = items.length - visibleItems;

	document
		.querySelector(".carousel-button.prev")
		.addEventListener("click", () => {
			currentIndex -= 1;
			if (currentIndex < 0) currentIndex = 0;
			updateCarousel();
		});

	document
		.querySelector(".carousel-button.next")
		.addEventListener("click", () => {
			currentIndex += 1;
			if (currentIndex > maxIndex) currentIndex = maxIndex;
			updateCarousel();
		});

	function updateCarousel() {
		cardWrapper.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
	}
}
