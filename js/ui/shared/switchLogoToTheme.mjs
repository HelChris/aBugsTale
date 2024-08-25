export const updateLogo = () => {
	const logo = document.getElementById("logo");
	const root = document.documentElement;

	const logoUrl = getComputedStyle(root)
		.getPropertyValue("--image-logo")
		.trim();
	logo.src = logoUrl.slice(4, -1).replace(/"/g, "");
};
