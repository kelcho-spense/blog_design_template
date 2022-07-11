import { useContext , useState } from 'react'
import SideBar from '../../components/sidebar/Sidebar'
import { Context } from '../../context/Context';
import axios from "axios";
import './settings.css'

function Settings() {
  const {user} = useContext(Context);
  const [file,setFile] =useState(null);
  const [username,setUsername] =useState("");
  const [email,setEmail] =useState("");
  const [password,setPassword] =useState('');
  const [success,setSuccess] =useState(false);
  const imageFolder = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    const updateUser = {
      username,email,password,userId: user._id
    };
    const data = new FormData();
    const filename = Date.now() + file?.name;
    data.append("name",filename);
    data.append("file",file);
    updateUser.profilepic = filename;
    try {
      await axios.post("/upload",data); //upload images
    } catch (error) {
      console.log(error)
    }
    try {
      await axios.put("/users/"+user._id,updateUser); //save post
      setSuccess(true);
    } catch (error) {
      console.log(error)
    }
   
  };

  return (
    <div className='settings'>
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className='settingsTitleUpdate'>Update Your Account</span>
          <span className='settingsTitleDelete'>Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label htmlFor="">Profile Picture</label>
          <div className="settingsPP">
            {
            file ? (
              <img  alt="..." className="writeImg"  src={URL.createObjectURL(file)} />
            ) :(
              <img src={imageFolder + user.profilepic} alt="..upload your profile pic" />
            )
            }
              
            <label htmlFor="fileinput">
              <i className=" settingsPPIcon fa-solid fa-user-pen"></i>
            </label>
            <input  className="settingsPPInput" 
              type="file" id='fileinput' style={{display:"none"}} 
              onChange={e =>setFile(e.target.files[0])} 
            />
          </div>
          <label>Username</label>
            <input type="text" placeholder={user.username} name="name" 
            onChange={e =>setUsername(e.target.value)} required />
          <label>Email</label>
            <input type="email" placeholder={user.email} name="email"
            onChange={e =>setEmail(e.target.value)} required />
          <label>Password</label>
            <input type="password" placeholder="**********" name="password" 
            onChange={e =>setPassword(e.target.value)}/>
          <button className="settingsSubmitButton" type="submit"> Update </button>
          {success && <span 
                        style={{ marginTop: "20px",
                        textAlign: "center",color: "green",fontWeight: "bold" }}
                      >Profile has been updated..!!</span>}
        </form>
      </div>
        <SideBar/>
     
    </div>
  )
}

export default Settings