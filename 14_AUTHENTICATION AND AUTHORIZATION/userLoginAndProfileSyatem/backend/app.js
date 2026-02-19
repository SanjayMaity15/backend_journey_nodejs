import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());

let CLIENT_ID;

let CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:8000/auth/google";

// This is the URL Google redirects to
app.get("/auth/google", async (req, res) => {
	const code = req.query.code;
	if (!code) return res.send("No code received");

	try {
		const payload = `code=${code}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${REDIRECT_URI}&grant_type=authorization_code`;

		const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: payload,
		});

		const tokenData = await tokenRes.json();

		const idToken = tokenData.id_token;
		const base64Payload = idToken.split(".")[1];

		const userInfo = JSON.parse(
			Buffer.from(base64Payload, "base64").toString("utf-8"),
		);
		console.log(userInfo);
		res.send(`
      <script>
        window.opener.postMessage(
          { type: 'GOOGLE_AUTH', user: ${JSON.stringify(userInfo)} },
          'http://localhost:5501'
        );
        window.close();
      </script>
    `);
	} catch (err) {
		console.error(err);
		res.send("Error fetching user info");
	}
});

app.listen(8000, () => console.log("Backend running on port 8000"));
