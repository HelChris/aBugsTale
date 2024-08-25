import { BASE_URL } from "/js/constants/api.mjs";

export async function makeApiCall(endpoint) {
	try {
		const url = `${BASE_URL}${endpoint}`;
		const response = await fetch(url);
		if (!response.ok) throw new Error("Network response was not ok.");

		const results = await response.json();
		return results;

		// console.log(results);
	} catch (error) {
		console.error(error);
		throw error;
		//resultsContainer.innerHTML = error;
	}
}
