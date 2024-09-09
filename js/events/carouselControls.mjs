// carouselControls.mjs
import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

export const swiper = new Swiper(".card-wrapper", {
	loop: true,
  spaceBetween: 10,
  slidesPerView: 1,
  slidesPerGroup: 1,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},

	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},

	breakpoints: {
		0: {
      slidesPerView: 1,
      slidesPerGroup: 1,
		},
		768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
		},
		1024: {
      slidesPerView: 3,
      slidesPerGroup: 3,
		},
	},
});
