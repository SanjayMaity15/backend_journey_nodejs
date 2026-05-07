let clientId 

const redirectUrl = "http://localhost:8000/auth/google/callback";

const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&scope=openid%20email%20profile&redirect_uri=${redirectUrl}`;

const btn = document.getElementById("btn");

btn.addEventListener("click", () => {

	window.open(
		authUrl,
		"google-login",
		"width=500, height=500, left=100, top= 100",
	);
});



window.addEventListener("message", (e) => {
	if (e.data.success) {
		console.log(e.data.user);
	}
});

