//data modeling of the todo list 
import  mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true, // Ensures this field is not empty
      trim: true,     // Removes whitespace from beginning and end
    },
    description: {
      type: String,
      trim: true,
    },
    completed: {
      type: Boolean,
    }
},{timestamps:true});

export const Todo = mongoose.model('Todo', todoSchema);

