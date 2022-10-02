import "../styles.css";
import React, { useEffect, useState } from "react";
import { useUserAuth } from "../context/userAuthContext";

import {
  doc,
  deleteDoc,
  addDoc,
  collection,
  getDocs,
  updateDoc
} from "firebase/firestore";
import { db } from "../todoFirebase";
import { Link } from "react-router-dom";

function Home() {
  // const [userLogin, setUserLogin] = useState(false);
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [editBtn, setEditBtn] = useState(false);
  const [editId, setEditId] = useState();
  const [message, setMessage] = useState({ error: false, msg: "" });

  const { user, logout } = useUserAuth();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      setMessage({ error: true, msg: err.message });
      console.log(message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const getData = await getDocs(collection(db, "todos"));
    setData(getData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleCHange = (e) => {
    setInput(e.target.value);
  };

  const handleCreate = async () => {
    if (input === "") {
      setMessage({ error: true, msg: "All fields are mandatory" });
      return;
    }
    await addDoc(collection(db, "todos"), {
      todo: input,
      author: user.uid
    });
    setInput("");
    getTodos();
  };

  const handleDelete = async (d) => {
    await deleteDoc(doc(db, "todos", d.id));
    getTodos();
  };

  const handleEdit = (doc) => {
    setEditBtn(true);
    setEditId(doc.id);
    setInput(doc.todo);
  };

  const handleSave = async () => {
    const editTodo = {
      author: user.uid,
      todo: input
    };
    await updateDoc(doc(db, "todos", editId), editTodo);
    setEditBtn(false);
    setInput("");
    getTodos();
  };

  return (
    <div className="App">
      <h1>Hello</h1>
      <p>{user.email}</p>
      <input
        value={input}
        type="text"
        placeholder="write here.."
        onChange={handleCHange}
      />

      {editBtn === true ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={handleCreate}>Create</button>
      )}

      <button
        onClick={() => {
          handleLogout();
        }}
      >
        Logout
      </button>

      {data.map((doc) => {
        return (
          <div className="todos">
            <p key={doc.id}>{doc.todo}</p>
            <button
              onClick={() => {
                handleEdit(doc);
              }}
            >
              Edit
            </button>

            <button
              onClick={() => {
                handleDelete(doc);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
      <Link to="/chat">
        <button>Chat</button>
      </Link>
    </div>
  );
}
export default Home;
