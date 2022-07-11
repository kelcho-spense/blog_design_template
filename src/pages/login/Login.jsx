import './login.css';
import { Link } from "react-router-dom";
import { Context } from '../../context/Context';
import axios from 'axios';
import { useContext,useRef,useState} from 'react';
function Login() {

  const userRef = useRef();
  const passwordRef = useRef();
  const {dispatch,isFetching } = useContext(Context);
  const [error,setError] = useState(false);

  const handleLogin = async(e) => {
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try {
      setError(false);
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({type:"LOGIN_SUCCESS",payload: res.data});
    
    } catch (error) {
      setError(true);
      dispatch({type:"LOGIN_FAILURE"});
    }
  }
  return (
    <div className="login">
    <span className="loginTitle">Login</span>
    <form className="loginForm" onSubmit={handleLogin}>
      <label>Username</label>
      <input className="loginInput" type="text" ref={userRef} placeholder="Enter your username..." />
      <label>Password</label>
      <input className="loginInput" type="password" ref={passwordRef}  placeholder="Enter your password..." />
      <button className="loginButton" type='submit' disabled={isFetching}>Login</button>
      { error && <span 
                        style={{ marginTop: "20px",
                        textAlign: "center",color: "green",fontWeight: "bold" }}
                      >Wrong Credentials!!</span> }
    </form>
      <button className="loginRegisterButton">
      <Link className='link' to="/register">Register</Link>
      </button>
  </div>
  )
}

export default Login