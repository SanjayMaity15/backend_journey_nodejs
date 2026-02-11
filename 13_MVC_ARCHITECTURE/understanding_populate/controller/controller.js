import Post from "../model/postModel.js";
import User from "../model/userModel.js";

export const createUser = async (req, res) => {
    try {
        // const { name, age } = req.body;
       const user = await User.insertMany([
			{ name: "Sanjay", age: 24 },
			{ name: "maity", age: 14 },
		]);
        res.status(201).json({
            messgage: "User created successfully",
            user
        })
    } catch (error) {
        console.log(error)
    }
}

export const getUser = async (req, res) => {
    try {
        const { name } = req.body;
       const user =  await User.findOne({ name })
        res.status(201).json({
            messgage: "User created successfully",
            user
        })
        console.log(user.schema.virtuals)
        user.upperCaseName = " op"
        console.log(user.upperCaseName)
        await user.save()
    } catch (error) {
        console.log(error)
    }
}



export const createPost = async (req, res) => {
    try {
        const { postName, author } = req.body;
       const post =  await Post.create({ postName, author })
        res.status(201).json({
            messgage: "post created successfully",
            post
        })
    } catch (error) {
        console.log(error)
    }
}

export const getPost = async (req, res) => {
    try {
        
       const post =  await Post.find().populate({path: "author", select : "name -_id "})
        res.status(201).json({
            messgage: "post fetch successfully",
            post
        })
    } catch (error) {
        console.log(error)
    }
}