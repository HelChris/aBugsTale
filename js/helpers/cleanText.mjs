export function cleanText(text) {
	return text
		.replace(/^\n+/, "") // Removes newline characters at the beginning
		.replace(/<\/?[^\>]+>/g, "") // Removes HTML tags
		.replace(/&#8217;/g, "'") // Replace HTML entity with apostrophe
		.replace(/\n+$/, "") // Removes newline characters at the end
		.replace(/&#8211;/, ""); // Removes the dashes
}
