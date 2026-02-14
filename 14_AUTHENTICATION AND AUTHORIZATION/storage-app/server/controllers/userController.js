import Directory from "../models/directoryModel.js";
import User from "../models/userModel.js";
import  { Types } from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt"


export const register = async (req, res, next) => {
	const { name, email, password } = req.body;
	// const session = await mongoose.startSession();
  // const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")
  
    
    const hashedPassword = await bcrypt.hash(password, 10)
  
    
  
	try {
		const rootDirId = new Types.ObjectId();
		const userId = new Types.ObjectId();

		// session.startTransaction();

		await Directory.insertOne(
			{
				_id: rootDirId,
				name: `root-${email}`,
				parentDirId: null,
				userId,
			},
			// { session }
		);

		await User.insertOne(
			{
				_id: userId,
				name,
				email,
				password:hashedPassword,
				rootDirId,
			},
			// { session }
		);

		// session.commitTransaction();

		res.status(201).json({ message: "User Registered" });
	} catch (err) {
		// session.abortTransaction();
		if (err.code === 121) {
			res.status(400).json({
				error: "Invalid input, please enter valid details",
			});
		} else if (err.code === 11000) {
			if (err.keyValue.email) {
				return res.status(409).json({
					error: "This email already exists",
					message:
						"A user with this email address already exists. Please try logging in or use a different email.",
				});
			}
		} else {
			next(err);
		}
	}
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  
  

	const user = await User.findOne({ email });
	if (!user) {
		return res.status(404).json({ error: "Invalid Credentials" });
	}

  

//   const enterHashedPass = crypto.pbkdf2Sync(password, salt, 100000, 32, "sha256").toString("base64url")

	// res.cookie("uid", user._id.toString() + (Date.now() + (1 * 60 * 1000)).toString(16), {
	//   httpOnly: true,
	//   maxAge: 3 * 60 * 1000,
	// });

	//   console.log({savedPass, enterHashedPass});
	
	const isCorrewctPassword = await bcrypt.compare(password, user.password)

  if (!isCorrewctPassword) {
    return res.status(404).json({error: "Invalid credential"})
  }

	const cookiePayload = JSON.stringify({
		id: user._id,
		expiryTime: Date.now() + 2 * 60 * 1000,
	});

	// const signature = crypto
	// 	.createHmac("sha256", my_secret)
	// 	.update(cookiePayload)
	// 	.digest("base64url");

	// const signedToken = `${Buffer.from(cookiePayload).toString("base64url")}.${signature}`;

	res.cookie(
		"token",
    Buffer.from(cookiePayload).toString("base64url"),
    
		{
      httpOnly: true,
      signed: true,
			maxAge: 3 * 60 * 1000,
		},
	);

	res.json({ message: "logged in" });
};

export const getCurrentUser = (req, res) => {
	res.status(200).json({
		name: req.user.name,
		email: req.user.email,
	});
};

export const logout = (req, res) => {
	res.clearCookie("token");
	res.status(204).end();
};
