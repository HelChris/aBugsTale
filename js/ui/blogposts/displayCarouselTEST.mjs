// import { fetchBlogPostInfo } from "/js/events/fetchBlogPostInfo.mjs";
// import { BASE_URL } from "/js/constants/api.mjs";
// import { displayBlogPostCard } from "/js/ui/blogposts/displayBlogPostCards.mjs";
// import { initCarouselControls } from "/js/events/carouselControls.mjs";

// // the carousel sectionc/box:
// export async function displayCarousel() {
// 	const section = document.getElementById("carousel-section");
// 	if (!section) {
// 		console.error("Carousel section not found in the HTML.");
// 		return;
// 	}

// 	const h1 = document.createElement("h1");
// 	h1.className = "carousel-h1";
// 	h1.textContent = "The latest stories:";
// 	section.appendChild(h1);

// 	const carouselView = document.createElement("div");
// 	carouselView.className = "carousel-view";
// 	carouselView.id = "carousel-view";
// 	section.appendChild(carouselView);

// 	const prevBtn = document.createElement("button");
// 	prevBtn.className = "prev-btn";
// 	prevBtn.id = "prev-btn";
// 	carouselView.appendChild(prevBtn);

// 	const itemList = document.createElement("div");
// 	itemList.className = "item-list";
// 	itemList.id = "item-list";
// 	carouselView.appendChild(itemList);

// 	const carouselCard = document.createElement("div");
// 	carouselCard.className = "carousel-card";
// 	carouselCard.id = "carousel-card";
// 	carouselView.appendChild(carouselCard);

// 	const nextBtn = document.createElement("button");
// 	nextBtn.className = "next-btn";
// 	nextBtn.id = "next-btn";
// 	carouselView.appendChild(nextBtn);

// 	//append the section to the document or a specific container:
// 	document.body.appendChild(section);

// 	await displayCarouselPosts(BASE_URL + "/posts");
// 	//setup carousel items:
// 	await setupCarouselItems();
// }

// async function loadBlogPosts() {
// 	const BASE_URL = "'api-endpoint";
// 	const blogPosts = await fetchBlogPostInfo(BASE_URL);
// }
// // retrive the blogPosts and insert them as <li> items inside the <div class="item-list">:
// async function setupCarouselItems(postsForCarousel) {
// 	try {
// 		const itemList = document.querySelector(".item-list");
// 		postsForCarousel.forEach((post) => {
// 			const carouselCard = displayBlogPostCard(post);
// 			itemList.appendChild(carouselCard);
// 		});
// 	} catch (error) {
// 		console.error("Failed to setup carousel items:", error);
// 	}
// }

// async function displayCarouselPosts(url) {
// 	try {
// 		const allPosts = await fetchBlogPostInfo(url);
// 		const postsForCarousel = allPosts.slice(0, 6);

// 		await setupCarouselItems(postsForCarousel);
// 	} catch (error) {
// 		console.error("Failed to display posts in carousel:", error);
// 	}
// }
// document.addEventListener("DOMContentLoaded", () => {
// 	initCarouselControls();
// });
