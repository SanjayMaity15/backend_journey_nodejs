import express from "express";
import Session from "../models/Session.js";
import Course from "../models/Course.js";

const router = express.Router();

// GET cart
router.get("/", async (req, res) => {
  //Add your code here
  const { sid } = req.signedCookies;
  
  const session = await Session.findById({ _id: sid })
  

  
  const courseIds = session.data.cart.map(({ courseId }) => courseId)
  
  const allCartItems = await Course.find({ _id: { $in: courseIds } })

  const finalCartItemsData = allCartItems.map((item) => {
    const { _id, name, price, image } = item;
    
    const {quantity} = session.data.cart.find(({courseId}) => courseId === _id.toString())

    return {
      _id,
      name,
      price,
      image,
      quantity
    }
  })

  res.status(200).json({
    message: "cart item fetch succesfully",
    finalCartItemsData
  })
  

});

// Add to cart
router.post("/", async (req, res) => {
	const { courseId } = req.body;
	const { sid } = req.signedCookies;

	let result = await Session.updateOne({ _id: sid, "data.cart.courseId": courseId }, {$inc : {"data.cart.$.quantity": 1}});


  if (result.matchedCount === 0) {
    await Session.updateOne({ _id: sid }, {
      $push: {
      "data.cart": {courseId, quantity: 1}
    }})
  }

	

	res.status(200).json({
		message: "Course added to the cart",
	});
});

// Remove course from cart
router.delete("/:courseId", async (req, res) => {
  //Add your code here
  const { courseId } = req.params;
  const { sid } = req.signedCookies;

  const session = await Session.updateOne({_id:sid}, {$pull: {"data.cart": {courseId}}})
  
  
  res.status(200).json({
    mesage: "Item deleted successfully"
  })

});

// Clear cart
router.delete("/", async (req, res) => {
	//Add your code here
});

export default router;
