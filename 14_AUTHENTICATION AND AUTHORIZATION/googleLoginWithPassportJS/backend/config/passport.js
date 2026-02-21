import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";


const CLIENT_ID = "";
const CLIENT_SECRET = "";
const REDIRECT_URI = "";

passport.use(
	new GoogleStrategy(
		{
			clientID: CLIENT_ID,
			clientSecret: CLIENT_SECRET,
			callbackURL: REDIRECT_URI,
		},
		function (accessToken, refreshToken, profile, cb) {
			return cb(null, profile);
		},
	),
);
