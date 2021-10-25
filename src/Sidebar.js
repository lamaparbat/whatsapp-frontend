import { React, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { CachedOutlined, ExitToApp, MessageOutlined, SearchOutlined } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import selectedChat from './redux/actions/actions';
import './Sidebar.css';

function Sidebar({ users, user }) {
   const history = useHistory()
   const dispatch = useDispatch()
   const curUser = JSON.parse(localStorage.getItem("userData"))
   
   //logout
   const logout = () => {
      localStorage.setItem("userData", JSON.stringify({
         name: "",
         email: "",
         profile: ""
      }))
      history.push("/Login")
   }

   const Header = ({ user }) => {
      return (
         <>
            <div className="sidebar__header">
               <Avatar id="profile" src={user.profile} />
               <div id="sidebar__header__right">
                  <CachedOutlined id="refreshIcon" />
                  <MessageOutlined id="messageIcon" />
                  {/* <MoreVert id="moreIcon" /> */}
                  <ExitToApp id="moreIcon" onClick={logout} />
               </div>
            </div>
         </>
      )
   }

   const SearchBar = () => {
      return (
         <>
            <div className="SearchBar">
               <div>
                  <SearchOutlined id="searchIcon" />
                  <input type="search" placeholder="Search or start a new chat" />
               </div>
            </div>
         </>
      )
   }

   const ChatHead = (props) => {
      return (
         <>
            <div className="siderbar_chathead" onClick={() => selectChat(props)}>
               <div className="left">
                  <Avatar className="my-2" id="profile" src={props.profile} />
                  <div className="pt-2" id="message">
                     <span><strong>{props.name}</strong></span>
                     <p>{props.message}</p>
                  </div>
               </div>
               <div className="right">
                  <span>{props.online}</span>
               </div>
            </div>
         </>
      )
   }

   //selected chat head
   const selectChat = (data) => {
      const param = {
         sender: user.email,
         reciever: data.email,
         reciever_name: data.name,
         profile: data.profile
      }
      dispatch(selectedChat(param))
      if (window.innerWidth < 1100) {
         document.querySelector(".sidebar").style.display = "none";
         document.querySelector(".sidebar__chat").style.display = "flex";
         document.querySelector(".sidebar__chat").style.flex = 1;
      }
   }
   
   return (
      <div className="sidebar">
         <Header user={user} />
         <SearchBar />
         {
            users ? users.map((data, index) => data.email !== curUser.email ?
               <ChatHead name={data.name} message={""} profile={data.profile} email={data.email} online="12:30 pm" count={2} key={index} />
            : null
            ) : null
         }
      </div>
   )
}

export default Sidebar
