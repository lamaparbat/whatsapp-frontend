import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import './Home.css';
import Sidebar from './Sidebar';
import Pusher from "pusher-js";
import Chat from './Chat';


function Home() {
      const [users, setUser] = useState()
      const check = useSelector(state => state.state)
      const [status, setStatus] = useState(null);
      
      //users
      useEffect(() => {
            //retrieving users
            axios.create({
                  baseURL: "https://whatsapp-backendversion.herokuapp.com/"
            }).get("/getUser").then(response => {
                  setUser(response.data)
            })
      }, [])
      
      // online status user pusher listener
      console.log(status)
      useEffect(() => {
            var pusher = new Pusher('4f79555c3080807b1d69', {
                  cluster: 'ap2'
            });
            const channel = pusher.subscribe('users');
            channel.bind("updated", (data) => {
                  setStatus(data);
            })
      }, [status])

      return (
            <div className="Home">
                        <Sidebar users={users} user={JSON.parse(localStorage.getItem("userData"))} />
                  {
                        check ? <Chat user={JSON.parse(localStorage.getItem("userData"))} />
                              : <Chat user="" />
                  }
            </div>
      )
}

export default Home
