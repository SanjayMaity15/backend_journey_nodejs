import nodemailer from "nodemailer";

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	auth: {
		user: "sanjaysanjaydummy118@gmail.com",
		pass: "",
	},
});

// Send an email using async/await

const info = await transporter.sendMail({
	// from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
	to: "maitysanjay357@gmail.com",
	subject: "Hello Sanjay ✔",
	html: "<b>Hello world?</b>", // HTML version of the message
});

console.log("Message sent:", info.messageId);
