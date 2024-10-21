import { makeApiCall } from "/js/api/makeApiCall.mjs";

export async function fetchBlogPostInfo(url) {
	try {
		const data = await makeApiCall("?per_page=13&_embed"); // Use JSON response directly

		const blogInfo = data.map((post) => {
			// parse the HTML content
			const parser = new DOMParser();
			const excerptDoc = parser.parseFromString(post.excerpt.rendered, "text/html");
			const contentDoc = parser.parseFromString(post.content.rendered, "text/html");

			//extract paragraphs from content
			const paragraphs = Array.from(contentDoc.querySelectorAll('p')).map(p => p.outerHTML);

			return {
				id: post.id,
				date: post.date,
				author: post._embedded?.author?.[0]?.name || "Unknown",
				modified: post.modified,
				featuredImage:
					post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
					"defaultImageUrl",
				title: post.title.rendered,
				excerpt: excerptDoc.body.textContent || "",
				content: paragraphs,
			};
		});

		return blogInfo;
	} catch (error) {
		console.error("Failed to fetch blog post info:", error);
		throw error;
	}
}