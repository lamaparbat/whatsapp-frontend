import { useHistory } from 'react-router';
import { ArrowBack, EditOutlined } from '@material-ui/icons';
import './Profile.css';
import { CSSTransition } from 'react-transition-group';

function Profile({user}) {
 const history = useHistory()

 //redirect to page
 const previous = () => {
  history.push("/")
 }
 

 return (
   <div className="profileContainer">
    <div id="header">
     <ArrowBack className="prev mx-3" onClick={previous} />
     <h5 className="mx-4">Profile</h5>
    </div>
    <center><div className="circleAvatar my-5" style={{ backgroundImage: `url('${user.profile}')` }}></div></center>
    <div className="namePanel bg-light py-3">
     <span id="name">Your name</span>
     <div>
      <span>{user.name}</span>
      <EditOutlined id="icon" />
     </div><br />
     <span id="name">Email</span>
     <div>
      <span>{user.email}</span>
      <EditOutlined id="icon" />
     </div><br />
     <span id="name">Contact</span>
     <div>
      <span>+977-9813890677</span>
      <EditOutlined id="icon" />
     </div>
    </div>
    <div className="about px-5 py-3 bg-light">
     <span>This is the first page of going in the world how are you going on</span>
    </div>
    <span id="copyright" className="mx-5 my-4">&copy; parbatlama. policies. cookies. terms.</span>
   </div>
 )
}

export default Profile
