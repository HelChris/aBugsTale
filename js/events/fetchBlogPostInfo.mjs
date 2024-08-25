import { makeApiCall } from "/js/api/makeApiCall.mjs";

export async function fetchBlogPostInfo(url) {
	try {
		const data = await makeApiCall("?per_page=13&_embed"); //use JSON response directly

		const blogInfo = data.map((post) => ({
			id: post.id,
			date: post.date,
			modified: post.modified,
			featuredImage:
				post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
				"defaultImageUrl", // get the image URL
			title: post.title.rendered,
			excerpt: post.excerpt.rendered
				.replace(/^\n+/, "") // removes newline characters at the beginning
				.replace(/<\/?[^\>]+>/g, "") // removes HTML tags
				.replace(/&#8217;/g, "'") //replace HTML entity with apostrophe
				.replace(/\n+$/, ""), //removes newline characters at the end
			content: post.content.rendered
				.replace(/^\n+/, "") // removes newline characters at the beginning
				.replace(/<\/?[^\>]+>/g, "") // removes HTML tags
				.replace(/&#8217;/g, "'") //replace HTML entity with apostrophe
				.replace(/\n+$/, ""), //removes newline characters at the end
		}));

		console.log(blogInfo);
		return blogInfo;
	} catch (error) {
		console.error("Failed to fetch blog post info:", error);
		throw error; // rethrow error after logging it
	}
}
