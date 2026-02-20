import React from "react";
import { useEffect, useState } from "react";
import { API } from "../api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const load = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(()=>{ load(); },[]);

  const addTask = async () => {
    if(!title) return;
    await API.post("/tasks", { title });
    setTitle("");
    load();
  };

  const remove = async (id) => {
    await API.delete(`/tasks/${id}`);
    load();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="container py-4 bg-success">
      <div className="d-flex justify-content-between mb-4">
        <h2>Dash<span className="text-warning">Board</span></h2>
        <button className="btn btn-danger fs-4" onClick={logout}>Logout</button>
      </div>

      <div className="input-group mb-3">
        <input className="form-control" value={title}
          onChange={e=>setTitle(e.target.value)} placeholder="New task"/>
        <button className="btn btn-primary" onClick={addTask}>Add</button>
      </div>

      <ul className="list-group">
        {tasks.map(t => (
          <li key={t._id} className="list-group-item d-flex justify-content-between">
            {t.title}
            <button className="btn btn-sm btn-outline-danger"
              onClick={()=>remove(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
