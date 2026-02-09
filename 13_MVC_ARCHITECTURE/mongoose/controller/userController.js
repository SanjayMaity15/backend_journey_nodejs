import User from "../model/userModel.js";

export const addUser = async (req, res) => {
	try {
		const { username, email, age } = req.body;

		// const user = await User.insertOne({ username, email, age})
		// console.log(user)
		// const user = new User({ username, email, age })
		// await user.save()

		// const user = await User.create({username,email, age})

		res.status(201).json({
			message: "User created successfully",
		});
	} catch (error) {
		res.status(500).json({
			error: error,
		});
		console.log(error);
	}
};

export const updateUser = async (req, res) => {
	try {
		const { age } = req.body;
		const { id } = req.params;
		console.log(id);

		// const user = await User.findByIdAndUpdate({_id:id}, {age: 43})
		// console.log(user)

		const user = await User.findOneAndUpdate({ _id: id }, { age });
		console.log(user);

		res.status(201).json({
			message: "User updated successfully",
		});
	} catch (error) {
		res.status(500).json({
			error: error,
		});
		console.log(error);
	}
};

export const findUsers = async (req, res) => {
    try {
        
        const {age} = req.query;
        console.log(age)
		const users = await User.find({age : {$eq : age}}).select("username -_id").lean();
		console.log(users);

		res.status(200).json({
            message: "User find successfully",
            users
		});
	} catch (error) {
		res.status(500).json({
			error: error,
		});
		console.log(error);
	}
};


export const findUserById = async (req, res) => {
    try {
        const {id} = req.params;
        
		const user = await User.findById({_id:id}).lean()
		

		res.status(200).json({
            message: "User find successfully",
            user
		});
	} catch (error) {
		res.status(500).json({
			error: error,
		});
		console.log(error);
	}
};

export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        
		const user = await User.findByIdAndDelete({_id:id})
		

		res.status(200).json({
            message: "User deleted successfully",
            user
		});
	} catch (error) {
		res.status(500).json({
			error: error,
		});
		console.log(error);
	}
};
