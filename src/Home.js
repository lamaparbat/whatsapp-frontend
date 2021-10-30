import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import './Home.css';
import Sidebar from './Sidebar';
// import WelcomeBanner from "./WelcomeBanner";
import { CSSTransition } from 'react-transition-group';
import Chat from './Chat';

function Home() {
      const [users, setUser] = useState()
      const check = useSelector(state => state.state)

      //users
      useEffect(() => {
            //retrieving users
            axios.create({
                  baseURL: "http://localhost:8000"
            }).get("/getUser").then(response => {
                  setUser(response.data)
                  console.log(response.data)
            })

      }, [])


      return (
            <div className="Home">
                  <CSSTransition in="true" timeout={200} classNames="my-node">
                        <Sidebar users={users} user={JSON.parse(localStorage.getItem("userData"))} />
                  </CSSTransition>
                  {
                        check ? <Chat user={JSON.parse(localStorage.getItem("userData"))} />
                              : <Chat user="" />
                  }
            </div>
      )
}

export default Home
