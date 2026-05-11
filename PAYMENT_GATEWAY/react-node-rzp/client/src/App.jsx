import React from "react";

const App = () => {
	function openRazorpayPopup(orderId) {
		const options = {
			key: "", // Enter the Key ID generated from the Dashboard
			amount: "1000", // Amount is in currency subunits.
			currency: "INR",
			name: "Sanjay", //your business name
			description: "Test Transaction",
			
			order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
			handler: async function (response) {
				
				// alert(response.razorpay_order_id);
				
        const verifyResponse = await fetch("http://localhost:8000/verify-payment", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ razorpay_order_id: response.razorpay_order_id }),
        });
        
        const data = await verifyResponse.json()

        alert(data)

			},

			
			theme: {
				color: "#3399cc",
			},
		};
		let rzp = new Razorpay(options);
		rzp.on("payment.failed", function (response) {
			alert(response.error.code);
			alert(response.error.description);
			alert(response.error.source);
			alert(response.error.step);
			alert(response.error.reason);
			alert(response.error.metadata.order_id);
			alert(response.error.metadata.payment_id);
		});

		rzp.open();
	}

	async function handlePayment() {
		try {
			const response = await fetch("http://localhost:8000/payment", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ amountToPay: 10 }),
			});

			const result = await response.json();

			const orderId = result.data.id;

			openRazorpayPopup(orderId);

			console.log(result);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div>
			<h1>Learning Razorpay</h1>

			<button onClick={handlePayment}>pay 50</button>
		</div>
	);
};

export default App;
