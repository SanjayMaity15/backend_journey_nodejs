const payButton = document.getElementById("rzp-button");

payButton.addEventListener("click", (e) => {
    var rzp = new Razorpay({
		key: "",
		amount: "50000",
		currency: "INR",
		name: "Codeemy",
		theme: {
			color: "#b5cc33",
		},
	});
    rzp.open()
})
