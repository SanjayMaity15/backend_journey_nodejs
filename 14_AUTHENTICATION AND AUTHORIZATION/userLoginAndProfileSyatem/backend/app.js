import express from "express";
import cors from "cors";
import { OAuth2Client } from "google-auth-library";

const app = express();

app.use(express.json());

const CLIENT_ID =""

const CLIENT_SECRET = ""
const REDIRECT_URI = "";

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

app.get("/auth/google/authurl", (req, res) => {

    
	res.redirect(client.generateAuthUrl({scope: ["email", "profile", "openid"]}));
	res.end();
});

app.get("/auth/google", async (req, res) => {
	const {code, error} = req.query;
	if (error) {
		return res.send(`
            <script>
                window.opener.postMessage(
                    { type: 'GOOGLE_AUTH_ERROR', error: '${error}' },
                    'http://localhost:5501'
                );
                window.close();
            </script>
        `);
	}

	if (!code) {
		return res.send("No code received");
	}

	try {
		const { tokens } = await client.getToken(code);

		const verifiedData = await client.verifyIdToken({
			idToken: tokens.id_token,
			audience: CLIENT_ID,
		});

		const userInfo = verifiedData.getPayload();
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
		res.send(`
            <script>
                window.opener.postMessage(
                    { type: 'GOOGLE_AUTH_ERROR', error: 'Authentication failed' },
                    'http://localhost:5501'
                );
                window.close();
            </script>
        `);
	}
});

app.listen(8000, () => console.log("Backend running on port 8000"));
