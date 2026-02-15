import { useState } from "react";

function TodoItem({ todo, deleteTodo, toggleComplete, updateTodo }) {

  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleUpdate = () => {
    updateTodo(todo.id, newTitle);
    setIsEditing(false);
  };

  return (
    <div className="todo-item">

      {isEditing ? (
        <>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <span
            className={todo.completed ? "completed" : ""}
            onClick={() => toggleComplete(todo.id)}
            style={{ cursor: "pointer" }}
          >
            {todo.title}
          </span>

          <div>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </>
      )}

    </div>
  );
}

export default TodoItem;
