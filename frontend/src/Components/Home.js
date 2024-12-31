import React, { useState, useEffect } from 'react';

function Home(){
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({title:"",description:"",completed:false});
    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await fetch('http://localhost:5050/');
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    }
    const formSubmit = async(e)=>{
        e.preventDefault();
        console.log(newTodo);
        setTodos([...todos,newTodo]);
        try{
            const response = await fetch('http://localhost:5050/',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(newTodo)
            })
        }catch(err){
            console.log(err);
        }
        setNewTodo({title:"",description:"",completed:false});
        console.log(todos);

    }
    const HandleToggel = async (index) => {

        const todoToUpdate = todos[index];
            const response = await fetch(`http://localhost:5050/${todoToUpdate.title}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !todoToUpdate.completed }),
            });
        todos[index].completed = !todos[index].completed;
        setTodos([...todos]);
    }
    const HandleDelete = async (index) => {
        const todoToDelete = todos[index];

        const response = await fetch(`http://localhost:5050/${todoToDelete.title}`, {
            method: 'DELETE'
        });
        todos.splice(index, 1);
        setTodos([...todos]);
    }
    return(

        <div className="App">
            <h1>Todo Application</h1>
            <form onSubmit={e=>{formSubmit(e)}}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({...newTodo,title:e.target.value})}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({...newTodo,description:e.target.value})}
                />
                <button type="submit">Add Todo</button>

            </form>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={(e) => {HandleToggel(index)}}
                        />
                            {todo.title} - {todo.description}
                        <button onClick={() => {HandleDelete(index)}}>Delete</button>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default Home;