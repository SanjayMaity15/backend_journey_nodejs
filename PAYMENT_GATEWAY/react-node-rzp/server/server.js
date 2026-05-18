import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import { rzp } from "./config/rzp.js";

dotenv.config();

const app = express();

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	}),
);
app.use(express.json());

// app.post("/payment", async (req, res) => {
// 	try {
// 		const { amountToPay } = req.body;

// 		const order_id = await rzp.orders.create({
// 			amount: amountToPay * 100,
// 			currency: "INR",
// 		});

// 		res.status(200).json({
// 			message: "Successful",
// 			data: order_id,
// 		});
// 	} catch (error) {
// 		res.status(400).json({
// 			message: "Server error",
// 		});
// 	}
// });

// app.post("/verify-payment", async (req, res) => {
// 	try {
// 		const { razorpay_order_id } = req.body;

// 		const order = await rzp.orders.fetch(razorpay_order_id);

// 		if (order.status === "paid") {
// 			return res.status(200).json({
// 				message: "Successful",
// 				data: order,
// 			});
// 		}
// 	} catch (error) {
// 		res.status(400).json({
// 			message: "Server error",
// 		});
// 	}
// });

app.get("/", (req, res) => {
	res.send("Server is fine");
});

app.listen(8000, () => {
	console.log("Server is running");
});
