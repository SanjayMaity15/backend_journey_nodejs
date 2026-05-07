let clientId


	let clientSecret ;
const redirectUrl = "http://localhost:8000/auth/google/callback";

export async function fetchUser(code) {
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

	return finalUserData
}
