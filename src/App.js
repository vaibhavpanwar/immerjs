import { useState } from "react";
import "./App.css";
import produce from "immer";

function App() {
  const [todos, setTodos] = useState(["shopping", "workout", "study"]);
  const [todo, setTodo] = useState("");
  const [editTodo, setEditTodo] = useState(null);

  const clearForm = () => {
    setTodo("");
    setEditTodo(null);
  };

  //WITHOUT IMMER

  // const addTodo = () => {
  //   setTodos((prevState) => [todo, ...prevState]);
  //     clearForm()
  // };

  //WITH IMMER

  const addTodo = () => {
    setTodos(
      produce((draftState) => {
        draftState.unshift(todo);
      })
    );
    clearForm();
  };

  //WITHOUT IMMER

  // const deleteTodo = (i) => {
  //   setTodos(todos?.filter((item, index) => index !== i));
  //   clearForm();
  // };

  //WITH IMMER

  const deleteTodo = (i) => {
    setTodos(
      produce((draftState) => {
        draftState.splice(i, 1);
      })
    );
  };

  //WITHOUT IMMER

  // const updateTodo = () => {
  //   setTodos(todos?.map((item, index) => (index !== editTodo ? item : todo)));
  //     clearForm()
  // };

  //WITH IMMER

  const updateTodo = () => {
    setTodos(
      produce((draftState) => {
        draftState[editTodo] = todo;
      })
    );
    clearForm();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    editTodo || editTodo === 0 ? updateTodo() : addTodo();
  };
  return (
    <>
      <div className="container">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={todo}
            required
            onChange={(e) => setTodo(e.target.value)}
            placeholder={`whats in your list today`}
          />{" "}
        </form>
        {todos.map((item, index) => (
          <p className="todo-item">
            {item}{" "}
            <span>
              {" "}
              <span
                onClick={() => {
                  setTodo(item);
                  setEditTodo(index);
                }}
              >
                Edit
              </span>{" "}
              &nbsp; <span onClick={() => deleteTodo(index)}>Delete</span>
            </span>
          </p>
        ))}
      </div>
    </>
  );
}

export default App;
