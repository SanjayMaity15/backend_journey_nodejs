import { rediClient } from "./redis.mjs";

// const users = [
// 	{ name: "Aarav Sharma", age: 22, city: "Mumbai" },
// 	{ name: "Priya Sharma", age: 25, city: "Delhi" },
// 	{ name: "Rahul Verma", age: 28, city: "Bangalore" },
// 	{ name: "Sneha Verma", age: 21, city: "Kolkata" },
// 	{ name: "Vikram Singh", age: 30, city: "Chennai" },
// 	{ name: "Anjali Singh", age: 24, city: "Hyderabad" },
// 	{ name: "Rohan Patel", age: 27, city: "Pune" },
// 	{ name: "Meera Patel", age: 23, city: "Ahmedabad" },
// 	{ name: "Karan Das", age: 29, city: "Jaipur" },
// 	{ name: "Neha Das", age: 26, city: "Lucknow" },
// 	{ name: "Arjun Roy", age: 31, city: "Surat" },
// 	{ name: "Pooja Roy", age: 22, city: "Bhopal" },
// 	{ name: "Aditya Nair", age: 27, city: "Patna" },
// 	{ name: "Isha Nair", age: 20, city: "Indore" },
// 	{ name: "Manish Yadav", age: 33, city: "Nagpur" },
// 	{ name: "Kavya Yadav", age: 24, city: "Chandigarh" },
// 	{ name: "Siddharth Joshi", age: 28, city: "Noida" },
// 	{ name: "Tanya Joshi", age: 23, city: "Guwahati" },
// 	{ name: "Deepak Kaur", age: 35, city: "Ranchi" },
// 	{ name: "Simran Kaur", age: 26, city: "Kochi" },
// ];

// for (let i = 0; i < users.length; i++) {
// 	await rediClient.json.set(`user:${i + 1}`, "$", users[i]);
// }

// await rediClient.quit()
