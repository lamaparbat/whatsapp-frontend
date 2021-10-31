import { useHistory } from 'react-router';
import { ArrowBack, EditOutlined } from '@material-ui/icons';
import './Profile.css';


function Profile({user}) {
 const history = useHistory()

 //redirect to page
 const previous = () => {
  history.push("/")
 }
 

 return (
  <div className="profileContainer">
    <div id="header">
    <ArrowBack className="prev mx-3 animate__animated animate__zoomIn animate__delay-0.5s" onClick={previous} />
    <h5 className="mx-4 animate__animated animate__zoomIn animate__delay-0.5s">Profile</h5>
    </div>
   <center><div className="circleAvatar my-5 animate__animated animate__zoomIn animate__delay-0.5s" style={{ backgroundImage: `url('${user.profile}')` }}></div></center>
    <div className="namePanel  bg-light py-3">
    <span id="name" className="animate__animated animate__zoomIn animate__delay-0.5s">Your name</span>
     <div>
     <span className="animate__animated animate__zoomIn animate__delay-0.5s">{user.name}</span>
     <EditOutlined id="icon" className="animate__animated animate__zoomIn animate__delay-0.5s" />
     </div><br />
    <span id="name" className="animate__animated animate__slideInDown animate__delay-0.5s">Email</span>
     <div>
     <span className="animate__animated animate__slideInDown animate__delay-0.5s">{user.email}</span>
     <EditOutlined id="icon" className="animate__animated animate__slideInDown animate__delay-0.5s" />
     </div><br />
    <span id="name" className="animate__animated animate__slideInDown animate__delay-0.5s">Contact</span>
     <div>
     <span className="animate__animated animate__slideInDown animate__delay-0.5s">+977-9813890677</span>
     <EditOutlined id="icon" className="animate__animated animate__zoomIn" />
     </div>
    </div>
    <div className="about px-5 py-3 bg-light">
    <span>This is the first page of going in the world how are you going on</span>
    </div>
    <span id="copyright" className="mx-5 my-5">&copy; parbatlama. policies. cookies. terms.</span>
   </div>
 )
}

export default Profile
