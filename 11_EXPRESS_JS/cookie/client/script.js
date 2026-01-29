const res = await fetch("http://localhost:8000", {
    credentials: "include"
})
const data = await res.json()
console.log(data)