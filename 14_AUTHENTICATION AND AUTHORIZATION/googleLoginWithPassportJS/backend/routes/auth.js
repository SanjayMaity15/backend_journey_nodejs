import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
	"/google",

	passport.authenticate("google", { scope: ["profile", "email", "openid"] }),
);
    
router.get(
	"/google/callback",
	passport.authenticate("google", {
		failureRedirect: "http://localhost:5500",
		session: false,
	}),

	(req, res) => {
		console.log(req.user._json);
		res.send(`
      <script>
        window.opener.postMessage(
          { type: 'GOOGLE_AUTH', user: ${JSON.stringify(req.user._json)} },
          'http://localhost:5500'
        );
        window.close();
      </script>
    `);
	},
);

export default router;
