import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import './Home.css';
import Sidebar from './Sidebar';
import Chat from './Chat';


function Home() {
      const [users, setUser] = useState()
      const check = useSelector(state => state.state)

      
      //users
      useEffect(() => {
            //retrieving users
            axios.create({
                  baseURL: "https://whatsapp-backendversion.herokuapp.com/"
            }).get("/getUser").then(response => {
                  setUser(response.data)
                  console.log(response.data)
            })

      }, [])


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
