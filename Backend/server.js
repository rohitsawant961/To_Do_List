//for hosting your server
import express from 'express';
import dbConnection from './Components/db.js';
import {Todo} from './Components/todo.js';
import cors from 'cors';



const app = express();

app.use(cors('http://localhost:3000'));
app.use(express.json());
dbConnection
//API for creating a Task
app.get('/',async(req,res)=>{
    const todos = await Todo.find();
    res.send(todos);
})
app.post('/',async(req,res)=>{
    
    const { title, description, completed } = req.body;
    const newTodo = new Todo({ title, description, completed });

    await newTodo.save();

    res.send("Task created successfully");
});
//API for marking it completed
app.put('/:titleChange', async (req, res) => {
    const titleChange = req.params.titleChange;
    const completed = req.body.completed;

    const updateTask= await Todo.findOneAndUpdate(
        {title:titleChange},
        {completed},
        {new:true}
    );
    console.log(updateTask);
    res.json(updateTask);
}
);

app.delete('/:titleChange', async (req, res) => {
    const {titleChange}= req.params;
    const del = await Todo.findOneAndDelete(
        {title:titleChange}
    );
    console.log(del);
    res.json(del);
});
app.listen(5050, () => {
  console.log('Server is running on port 5050');
})
