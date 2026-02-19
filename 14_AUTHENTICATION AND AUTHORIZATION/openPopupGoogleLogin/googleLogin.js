// Get the code from query params
const code = new URLSearchParams(window.location.search).get("code");

if (code && window.opener) {
	// Send code to main page safely
	window.opener.postMessage(
		{ type: "GOOGLE_AUTH", code: code },
		"http://localhost:5500", // your main page origin
	);

	// Close popup
	window.close();
}
