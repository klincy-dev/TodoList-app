import { useState, useEffect } from "react";
import api from "./api";
import "./App.css";

function App() {

  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [editText, setEditText] = useState("");

  // 🔹 Fetch todos from backend when app loads
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await api.get("todos/");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async () => {
    if (!title) return;

    try {
     const response = await api.post("todos/add/", {
     title,
     completed: false,
});

setTodos(prev => [...prev, response.data]);

    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`todos/delete/${id}/`);

      setTodos(prev => prev.filter(t => t.id !== id));

    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const toggleComplete = async (todo) => {
  try {
    await api.put(`todos/update/${todo.id}/`, {
      title: todo.title,
      completed: !todo.completed,
    });

    // Update UI instantly
    setTodos(prev =>
      prev.map(t =>
        t.id === todo.id
          ? { ...t, completed: !t.completed }
          : t
      )
    );

  } catch (error) {
    console.error("Error updating:", error);
  }
};


  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setEditText(todo.title);
  };

  const saveEdit = async () => {
    try {
      await api.put(`todos/update/${editingTodo.id}/`, {
        title: editText,
        completed: editingTodo.completed,
      });
      setTodos(prev =>
      prev.map(t =>
        t.id === editingTodo.id
          ? { ...t, title: editText }
          : t
      )
    );
      setEditingTodo(null);
     
    } catch (error) {
      console.error("Error editing:", error);
    }
  };

  return (
    <div className="container">
      <h1>Todo App</h1>

      <div className="input-group">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {todos.map((todo) => (
        <div key={todo.id} className="todo-item">
          <span
            className={todo.completed ? "completed" : ""}
            onClick={() => toggleComplete(todo)}
          >
            {todo.title}
          </span>

          <div className="button-group">
  <button 
    className="edit-btn"
    onClick={() => openEditModal(todo)}
  >
    Edit
  </button>

  <button 
    className="delete-btn"
    onClick={() => deleteTodo(todo.id)}
  >
    Delete
  </button>
</div>


        </div>
      ))}

      {editingTodo && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Task</h3>
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={saveEdit}>Save</button>
              <button onClick={() => setEditingTodo(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
