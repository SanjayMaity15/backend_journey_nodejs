let clientId

let clientSecret;
const redirectUrl = "http://localhost:5500/googleLogin.html";
const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&scope=openid%20email%20profile&redirect_uri=${redirectUrl}`;

const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
	// window.open(authUrl, "google-login", "width=500, height=500, left=100, top= 100")
	window.open(
		authUrl,
		"google-login",
		"width=500, height=500, left=100, top= 100",
	);
});

let tokenRequested = false;

window.addEventListener("message", (e) => {
	// 1️⃣ Verify origin
	if (e.origin !== "http://localhost:5500") return;

	// 2️⃣ Verify message type
	if (!e.data || e.data.type !== "GOOGLE_AUTH") return;

	// 3️⃣ Prevent multiple calls
	if (tokenRequested) return;
	tokenRequested = true;

	console.log("Received auth code:", e.data.code);

	// 4️⃣ Call your token exchange function
	fetchTokenId(e.data.code);
});

async function fetchTokenId(code) {
	const payload = `code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUrl}&grant_type=authorization_code`;

	const data = await fetch("https://oauth2.googleapis.com/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: payload,
	});

	if (data.error) {
		return;
	}
	const userData = await data.json();
	
	const userToken = userData.id_token.split(".")[1];
	const finalUserData = JSON.parse(atob(userToken));
	
	console.log(finalUserData);
}
