import  './sidebar.css';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
function SideBar() {
  const [cat,setCat] = useState([]);
  useEffect(() => {
   (async() => {
      const res = await axios.get('/categories');
      setCat(res.data);
    })();
  }, [])
  

  return (
    <div className='sidebar'>
        <div className="sidebarItem">
          <span className="sidebarTitle">ABOUT ME</span> 
          <img src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg" alt="..." /> 
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
               Nobis facere vitae sequi dicta quaerat culpa odit itaque 
               totam perspiciatis sit accusamus!</p>
        </div> 
        <div className="sidebarItem">
            <span className="sidebarTitle">CATEGORIES</span>
            <ul className='sidebarList'>
              {
                cat.map((c,index)=> (
                  <Link className='link'key={index} to={`/?cat=${c.name}`}>
                    <li className="sidebarListItem" >{c.name}</li>
                  </Link>
                ))
              }
            </ul>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">FOLLOW US</span>
            <div className="sidebarSocial">
                <i className="siderbarIcon fa-brands fa-facebook"></i>
                <i className="siderbarIcon fa-brands fa-twitter"></i>
                <i className="siderbarIcon fa-brands fa-instagram"></i>
                <i className="siderbarIcon fa-brands fa-linkedin"></i>
            </div>
        </div> 
    </div>
  )
}

export default SideBar