# Mongoose Commands Cheat Sheet

A quick reference for commonly used **Mongoose queries and operations**.

| Operation | Command / Method | Description | Example |
|-----------|-----------------|------------|---------|
| **Create** | `create()` | Quickly creates and saves a new document | `const user = await User.create({ username: "Alice", email: "alice@example.com" });` |
| | `save()` | Create document instance first, then save | `const user = new User({ username: "Bob" }); await user.save();` |
| | `insertMany()` | Insert multiple documents at once | `await User.insertMany([{ username: "Charlie" }, { username: "Dave" }]);` |
| **Read** | `find()` | Get all matching documents | `const users = await User.find({ age: { $gte: 18 } });` |
| | `findOne()` | Get first matching document | `const user = await User.findOne({ username: "Alice" });` |
| | `findById()` | Get a document by `_id` | `const user = await User.findById("64xx1234567890abcdef");` |
| | `countDocuments()` | Count documents matching query | `const count = await User.countDocuments({ age: { $gte: 18 } });` |
| **Update** | `updateOne()` | Update first matching document | `await User.updateOne({ username: "Alice" }, { $set: { age: 26 } });` |
| | `updateMany()` | Update all matching documents | `await User.updateMany({ age: { $lt: 18 } }, { $set: { status: "minor" } });` |
| | `findByIdAndUpdate()` | Update by `_id` and return new doc | `const updated = await User.findByIdAndUpdate(id, { age: 30 }, { new: true });` |
| **Delete** | `deleteOne()` | Delete first matching document | `await User.deleteOne({ username: "Alice" });` |
| | `deleteMany()` | Delete all matching documents | `await User.deleteMany({ status: "inactive" });` |
| | `findByIdAndDelete()` | Delete document by `_id` | `await User.findByIdAndDelete(id);` |
| **Other / Query Helpers** | `sort()` | Sort results | `const users = await User.find().sort({ createdAt: -1 });` |
| | `limit()` | Limit number of results | `const users = await User.find().limit(10);` |
| | `skip()` | Skip documents (pagination) | `const users = await User.find().skip(10).limit(5);` |
| | `populate()` | Fill referenced fields | `const posts = await Post.find().populate("author");` |
| | `distinct()` | Get unique field values | `const emails = await User.distinct("email");` |
| | `aggregate()` | Advanced queries (group, sum, etc.) | `const result = await User.aggregate([{ $match: { age: { $gte: 18 } } }, { $group: { _id: null, avgAge: { $avg: "$age" } } }]);` |

---

## Tips

- Use **async/await** for cleaner, readable code.
- Use `.lean()` for faster reads when full Mongoose document methods are not needed:
```js
const users = await User.find().lean();
