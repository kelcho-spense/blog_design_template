import  './post.css';
import { Link } from "react-router-dom";
function Post({post}) {
  const imageFolder = "http://localhost:5000/images/";
  return (
   
    <div className='post'>
      {post.photo && (
        <Link className='link' to={`/post/${post._id}`}>
        <img className='postImg' src={imageFolder + post.photo} alt="...nopic" />
        </Link>
      )}
    <div className="postInfo">
        <div className="postCats">
          {
            post.categories.map((cat,index) => (
              <span className="postCat" key={index}><Link className='link' to={`/post/${cat._id}`}>{cat.name}</Link></span>
            ))
          }
        </div>
        <Link className='link' to={`/post/${post._id}`}>
          <span className="postTitle">{post.title}</span>
        </Link>        
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
    </div>
    <p className='postDesc'>{post.desc}</p>
    
    </div>
  )
}

export default Post