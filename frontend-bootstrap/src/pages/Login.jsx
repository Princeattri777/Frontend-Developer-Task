import React from "react";
import { useState } from "react";
import { API } from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await API.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);
    nav("/dashboard");
  };

  return (
    <div className="container d-flex justify-content-center bg-secondary align-items-center vh-100">
     
        <form onSubmit={submit} className="card p-4 shadow bg-info" style={{width:"350px"}}>
        <h3 className="mb-3 text-center">Login</h3>
        <input className="form-control mb-2" placeholder="Email"
          onChange={e=>setForm({...form,email:e.target.value})}/>
        <input type="password" className="form-control mb-3" placeholder="Password"
          onChange={e=>setForm({...form,password:e.target.value})}/>
        <button className="btn btn-primary w-100">Login</button>
        <Link to="/register" className="text-center mt-2">Register</Link>
      </form>
      </div>
      
    
  );
}
