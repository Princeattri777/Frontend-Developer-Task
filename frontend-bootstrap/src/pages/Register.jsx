import React from "react";
import { useState } from "react";
import { API } from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", form);
    nav("/");
  };

  return (
    <div className="container d-flex justify-content-center bg-dark align-items-center vh-100">
      <form onSubmit={submit} className="card p-4 shadow bg-info" style={{width:"350px"}}>
        <h3 className="mb-3 text-center">Register</h3>
        <input className="form-control mb-2" placeholder="Name"
          onChange={e=>setForm({...form,name:e.target.value})}/>
        <input className="form-control mb-2" placeholder="Email"
          onChange={e=>setForm({...form,email:e.target.value})}/>
        <input type="password" className="form-control mb-3" placeholder="Password"
          onChange={e=>setForm({...form,password:e.target.value})}/>
        <button className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
}
