import { makeApiCall } from "/js/api/makeApiCall.mjs";

const authorCache = new Map();

async function fetchAuthorName(authorId) {
	if (authorCache.has(authorId)) {
		return authorCache.get(authorId);
	}

	try {
		const response = await fetch(
			`https://helenech.com/a-bugs-tale/wp-json/wp/v2/users/${authorId}`
		);
		if (!response.ok) {
			throw new Error(`Failed to fetch author with ID ${authorId}`);
		}
		const authorData = await response.json();
		const authorName = authorData.name;
		authorCache.set(authorId, authorName);
		return authorName;
	} catch (error) {
		console.error(`Error fetching author name: ${error.message}`);
		throw error;
	}
}

function cleanText(text) {
	return text
		.replace(/^\n+/, "") // Removes newline characters at the beginning
		.replace(/<\/?[^\>]+>/g, "") // Removes HTML tags
		.replace(/&#8217;/g, "'") // Replace HTML entity with apostrophe
		.replace(/\n+$/, "") // Removes newline characters at the end
		.replace(/&#8211;/, ""); // Removes the dashes
}

export async function fetchBlogPostInfo(url) {
	try {
		const data = await makeApiCall("?per_page=13&_embed"); // Use JSON response directly

		const blogInfo = await Promise.all(
			data.map(async (post) => {
				const authorName = await fetchAuthorName(post.author);

				return {
					id: post.id,
					date: post.date,
					author: authorName, // Use the author's name
					modified: post.modified,
					featuredImage:
						post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
						"defaultImageUrl", // Get the image URL
					title: post.title.rendered,
					excerpt: cleanText(post.excerpt.rendered),
					content: cleanText(post.content.rendered),
				};
			})
		);

		// console.log(blogInfo);
		return blogInfo;
	} catch (error) {
		console.error("Failed to fetch blog post info:", error);
		throw error;
	}
}

// import { makeApiCall } from "/js/api/makeApiCall.mjs";

// async function fetchAuthorName(authorId) {
// 	try {
// 		const response = await fetch(
// 			`https://helenech.com/a-bugs-tale/wp-json/wp/v2/users/${authorId}`
// 		);
// 		if (!response.ok) {
// 			throw new Error(`Failed to fetch author with ID ${authorId}`);
// 		}
// 		const authorData = await response.json();
// 		return authorData.name;
// 	} catch (error) {
// 		console.error(`Error fetching author name: ${error.message}`);
// 		throw error;
// 	}
// }

// function cleanText(text) {
// 	return text
// 		.replace(/^\n+/, "") // Removes newline characters at the beginning
// 		.replace(/<\/?[^\>]+>/g, "") // Removes HTML tags
// 		.replace(/&#8217;/g, "'") // Replace HTML entity with apostrophe
// 		.replace(/\n+$/, "") // Removes newline characters at the end
// 		.replace(/&#8211;/, ""); // Removes the dashes
// }

// export async function fetchBlogPostInfo(url) {
// 	try {
// 		const data = await makeApiCall("?per_page=13&_embed"); // Use JSON response directly

// 		const blogInfo = await Promise.all(
// 			data.map(async (post) => {
// 				const authorName = await fetchAuthorName(post.author);

// 				return {
// 					id: post.id,
// 					date: post.date,
// 					author: authorName, // Use the author's name
// 					modified: post.modified,
// 					featuredImage:
// 						post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
// 						"defaultImageUrl", // Get the image URL
// 					title: post.title.rendered,
// 					excerpt: cleanText(post.excerpt.rendered),
// 					content: cleanText(post.content.rendered),
// 				};
// 			})
// 		);

// 		// console.log(blogInfo);
// 		return blogInfo;
// 	} catch (error) {
// 		console.error("Failed to fetch blog post info:", error);
// 		throw error;
// 	}
// }

////////////////////////////////////////////////////////////////////

// import { makeApiCall } from "/js/api/makeApiCall.mjs";

// export async function fetchBlogPostInfo(url) {
// 	try {
// 		const data = await makeApiCall("?per_page=13&_embed"); //use JSON response directly

// 		const blogInfo = data.map((post) => ({
// 			id: post.id,
// 			date: post.date,
// 			author: post.author,
// 			modified: post.modified,
// 			featuredImage:
// 				post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
// 				"defaultImageUrl", // get the image URL
// 			title: post.title.rendered,
// 			excerpt: post.excerpt.rendered
// 				.replace(/^\n+/, "") // removes newline characters at the beginning
// 				.replace(/<\/?[^\>]+>/g, "") // removes HTML tags
// 				.replace(/&#8217;/g, "'") //replace HTML entity with apostrophe
// 				.replace(/\n+$/, "") //removes newline characters at the end
// 				.replace(/&#8211;/, ""), //removes the dashes
// 			content: post.content.rendered
// 				.replace(/^\n+/, "") // removes newline characters at the beginning
// 				.replace(/<\/?[^\>]+>/g, "") // removes HTML tags
// 				.replace(/&#8217;/g, "'") //replace HTML entity with apostrophe
// 				.replace(/\n+$/, ""), //removes newline characters at the end
// 		}));

// 		console.log(blogInfo);
// 		return blogInfo;
// 	} catch (error) {
// 		console.error("Failed to fetch blog post info:", error);
// 		throw error; // rethrow error after logging it
// 	}
// }
