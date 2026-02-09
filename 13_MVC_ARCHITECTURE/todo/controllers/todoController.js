import { ObjectId } from "mongodb";
import Todo from "../model/todoModel.js";

export const addTodo = async (req, res) => {
  const { title, isCompleted } = req.body;
  console.log(title, isCompleted)
  try {
    const todo = await Todo.create({ title, isCompleted })
    res.status(201).json({
      message: "Todo created"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create todo" });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find()
    res.status(200).json({
      message: "Todo fetch successfully",
      todos
    })
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById({_id:id})
    res.status(200).json({
      message: "Todo find successfully",
      todo
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const {title, isCompleted} = req.body;
  try {
    const result = await Todo.findByIdAndUpdate({_id:id}, {title, isCompleted}, {new: true})

    res.status(200).json({ message: "Todo updated successfully", result });
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Todo.findByIdAndDelete({_id: id})
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
};
