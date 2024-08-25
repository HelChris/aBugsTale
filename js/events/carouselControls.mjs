// get objects (nxt-btn, prev-btn, itemlist) from the document and implement item scrolling with eventlistener listening for click AND keyboard navigation for accessibility

export function initCarouselControls() {
	const prev = document.getElementById("prev-btn");
	const next = document.getElementById("next-btn");
	const list = document.getElementById("item-list");
	const itemWidth = 150;
	const padding = 10;

	prev.addEventListener("click", () => {
		list.scrollLeft -= itemWidth + padding;
	});
	next.addEventListener("click", () => {
		list.scrollLeft += itemWidth + padding;
	});
}
