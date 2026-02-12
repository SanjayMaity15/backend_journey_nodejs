// When we use expire time in cokie inluce user id + expiretime we can increse the expire time using below

// let currentTime = Date.now() + (1 * 60 * 1000)
// let updatedTime = currentTime + (5*60*1000)

// console.log(updatedTime.toString(16))

// console.log(new Date(updatedTime).toString())

// let token = "698d5c6128df7009ee43803219c50eb3cbb";

// let a = (token.slice(24))
// let s = (parseInt(a, 16))
// s = s + 5 * 60 * 1000
// console.log(s.toString(16))
// console.log(new Date(a))

// using json.stringfy and parse

// const { expiryTime, id } = JSON.parse(
// 	'{"id":"698d5c6128df7009ee438032","expiryTime":1770885326164}',
// );

// let s = expiryTime + 5 * 60 * 1000
// console.log(s)

// console.log(expiryTime, id)

// console.log(
// 	JSON.stringify(
// 		'{"id":"698d5c6128df7009ee438032","expiryTime":1770885326164}',
// 	),
// );

// using base 64 string which use in jwt behind the scence

const { id, expiryTime } = JSON.parse(Buffer.from("eyJpZCI6IjY5OGQ1YzYxMjhkZjcwMDllZTQzODAzMiIsImV4cGlyeVRpbWUiOjE3NzA4ODU2NDY1NDd9", "base64url").toString(),);


const obj = {
    id, expiryTime
}

console.log({ id, expiryTime })

let newTime = expiryTime + 5 * 60 * 1000;


console.log(Buffer.from(JSON.stringify(obj)).toString("base64url"))


