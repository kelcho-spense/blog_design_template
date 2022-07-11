import { useEffect,useState,useContext } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './singlepost.css';
import { Link } from 'react-router-dom';
import { Context } from "../../context/Context";

function SinglePost() {
  const { user } =useContext(Context);
  const imageFolder = "http://localhost:5000/images/";
  const location = useLocation()
  const path = location.pathname.split('/')[2];
  const [post,setPost] = useState('');
  const [title,setTitle] = useState('');
  const [desc,setDesc] = useState('');
  const [updateMode,setUpdateMode] = useState(false);


  useEffect(() => {
    (async () => {
      const res = await axios.get('/posts/' + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    })();
  }, [path])
  
  const handleDelete = async () => {
    try {
    await axios.delete(`/posts/${post._id}`,{data:{username:user.username},});
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async () => {
    try {
    await axios.put(`/posts/${post._id}`,{
      username:user.username,title,desc},);
      setUpdateMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <div className="singlePost">
      <div className='singlePostWrapper'>
        {post.photo && (
          <img className='singlePostImg'  src={imageFolder + post.photo} alt=".." />
        )}
        {
          updateMode ? 
          (
            <input type="text" value={title} 
            className="singlePostTitleInput" autoFocus
            onChange={e => setTitle(e.target.value)}/>
            ) :(
            <h1 className='singlePostTitle'>
              {title}
              {
                post.username === user?.username &&
                <div className="singlePostEdit">
                  <i className=" singlePostIcon fa-solid fa-pen-to-square" onClick={()=>setUpdateMode(true)}></i>
                  <i className=" singlePostIcon fa-solid fa-trash-can" onClick={handleDelete}></i>
                </div> 
              }
            
            </h1>
          )
        }        
        <div className="singlePostInfo">
          <Link className='link' to={`/?user=${post.username}`}>
              <span className="singlePostAuthor">Author: <b>{post.username}</b></span> 
          </Link>
          <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span> 
        </div>
        { updateMode ? (
              <textarea className='singlePostDescInput'value={desc}
              onChange={e => setDesc(e.target.value)}/>
              ):(
            <p className='singlePostDesc'>
              {desc}
            </p>
        )}
        { updateMode && 
           <button className='singlePostButton' 
            onClick={handleUpdate}>UpdatePost
          </button>
        }
      </div>
    </div>
  )
}

export default SinglePost