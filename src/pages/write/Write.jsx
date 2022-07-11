import { useState ,useContext } from 'react';
import './write.css'
import axios from 'axios';
import { Context} from "../../context/Context";

function Write() {
  const [title,setTitle] =useState("");
  const [desc,setDesc] =useState("");
  const [file,setFile] =useState(null);
  const { user }= useContext(Context);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newPost = {
      title,
      desc,
      file,
      username: user.username
    };
    const data = new FormData();
    const filename = Date.now() + file.name;
    data.append("name",filename);
    data.append("file",file);
    newPost.photo = filename;
    try {
      await axios.post("/upload",data); //upload images
    } catch (error) {
      console.log(error)
    }
    try {
      const res = await axios.post("/posts",newPost); //save post
      window.location.replace("/post/" + res.data._id);
    } catch (error) {
      console.log(error)
    }
   
  };
  return (
    <div className='write'>
      {
        file && (
          <img  alt="..." className="writeImg"  src={URL.createObjectURL(file)} />
        )
      }
        <form className='writeForm' onSubmit={handleSubmit}>
            <div className="writeFormGroup">
                <label htmlFor="fileInput">
                <i className="writeIcon fa-solid fa-plus"></i>
                </label>
                <input type="file"  id="fileInput" onChange={e =>setFile(e.target.files[0])} style={{display:"none"}}/>
                <input type="text"   placeholder='Title' onChange={e =>setTitle(e.target.value)} className='writeInput' autoFocus={true} />
            </div>
            <div className="writeFormGroup">
               <textarea className='writeInput writeText' onChange={e =>setDesc(e.target.value)} placeholder='Tells us your story...' typeof=''></textarea> 
            </div>
            <button className="writeSubmit" type="submit">Publish</button>
        </form>
    </div>
  )
}

export default Write