import "./register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
export default function Register() {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [error,setError] = useState(false);
    const handleRegister = async(e) => {
        e.preventDefault();
        setError(false);
        try {
            const res = await axios.post("/auth/register",{
                username,email,password,
            });
            res.data && window.location.replace("/login");
        } catch (error) {
            setError(true);
        } 
        
        
    }
    return (
        <div className="register">
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handleRegister}>
            <label>Username</label>
            <input className="registerInput" type="text" 
              onChange={e=>setUsername(e.target.value)}  placeholder="Enter your username..." />
            <label>Email</label>
            <input className="registerInput" type="text" 
              onChange={e=>setEmail(e.target.value)}  placeholder="Enter your email..." />
            <label>Password</label>
            <input className="registerInput" type="password" 
              onChange={e=>setPassword(e.target.value)}  placeholder="Enter your password..." />
            <button className="registerButton" type="submit">Register</button>
        </form>
            <button className="registerLoginButton">
                <Link className='link' to="/login">Login</Link>
            </button>
            {error && <span style={{color: 'red',marginTop: '10px'}}>Try new Credentials!!</span>}
    </div>
    )
}