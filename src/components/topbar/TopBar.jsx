import './topbar.css';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";
function TopBar() {
   const imageFolder = "http://localhost:5000/images/";
   const { user, dispatch } =useContext(Context);
   const handleLogout = () => {
      dispatch({type:"LOGOUT"});
   };
  return (
    <div className='top'>
       <div className="topLeft">
            <i className="topIcon fa-brands fa-facebook"></i>
            <i className="topIcon fa-brands fa-twitter"></i>
            <i className="topIcon fa-brands fa-instagram"></i>
            <i className="topIcon fa-brands fa-linkedin"></i>
       </div>
       <div className="topCenter">
           <ul className='topList'>
              <li className="topListItem">
                 <Link className='link' to="/">HOME</Link>
              </li>
               <li className="topListItem">
                  <Link className='link' to="/about">ABOUT</Link>
              </li>
               <li className="topListItem">
                  <Link className='link' to="/contact">CONTACT</Link>
              </li>
              <li className="topListItem">
                  <Link className='link' to="/write">WRITE</Link>
              </li>
              <li className="topListItem" onClick={handleLogout}>
                {user &&  "LOGOUT"}                 
              </li>
           </ul>
       </div>
       <div className="topRight">
         {
           user ? (
                     user.profilepic ? (
                        <Link className='link' to="/settings">
                           <img className='topImg' src={imageFolder + user.profilepic} alt=".." />
                        </Link>
                        ):(
                        <Link className='link' to="/settings">
                           <img className='topImg' src={`https://avatars.dicebear.com/api/pixel-art/${user.username}.svg`} alt=".." />
                        </Link>
                        )
                   ) : (
             <ul className='topList'>
                <li className="topListItem"> 
                   <Link className='link' to="/login">Login</Link>
                </li>
                <li className="topListItem">
                   <Link className='link' to="/register">Register</Link>
                </li>
            </ul>
                   )
         }
          <i className="topsearchIcon fa-solid fa-magnifying-glass"></i>
       </div>
    </div>
  )
}

export default TopBar