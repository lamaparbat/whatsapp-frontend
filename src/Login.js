import { React, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, provider } from './firebase.js';
import axios from 'axios';
import './Login.css';

function Login() {
  const history = useHistory()
  
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("userData")) && JSON.parse(localStorage.getItem("userData")).email) {
      history.push("/Home")
    } else {
      history.push("/")
    }
  }, [])
  
  const loginGoogle = () => {
    auth.signInWithPopup(provider)
      .then((data) => {
        //sending user data to server
        axios.create({
          baseURL: "https://whatsapp-backendversion.herokuapp.com/"
        }).post("/createNewUser", {
          name: data.user._delegate.displayName,
          email: data.user._delegate.email,
          profile: data.user._delegate.photoURL
        }).then(res => {
          console.log(res)
          if (res.data.created) {
            localStorage.setItem("userData", JSON.stringify(res.data.data))
            history.push("/Home")
          } else {
            localStorage.setItem("userData", JSON.stringify(res.data.data))
            history.push("/Home")
          }
        })
      })
  }

  return (
    <>
      {
          <div className="container">
            <div className="container__body">
              <h2 className="bg-white"> Welcome to my whatsapp clone app</h2><br />
              <button onClick={loginGoogle} className="btn btn-danger rounded-0">SIGNUP WITH GOOGLE</button>
            </div>
            <p>&copy; copyright parbatLama</p>
          </div>
      }
    </>
  )
}

export default Login
