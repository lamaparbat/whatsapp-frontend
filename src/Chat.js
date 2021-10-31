import { Avatar } from '@material-ui/core';
import { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import Pusher from 'pusher-js';
import { ArrowBack, AttachFile, EmojiEmotions, MoreVert, SearchOutlined, SendOutlined } from '@material-ui/icons';
import './Chat.css';
import WelcomeBanner from './WelcomeBanner';
import axios from 'axios';
import Picker from 'emoji-picker-react';


function Chat() {
  const message =  useRef()
  const history = useHistory()
  const state = useSelector((state) => state.state)
  const [messages, setMessage] = useState([]);
  const [currWidth, setCurWidth] = useState(window.innerWidth);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [isEmojiClick, setEmojiClick] = useState(false);


  const curUser = JSON.parse(localStorage.getItem("userData")).email
  const [chatHead, setChatHead] = useState({
    name: "",
    email: "",
    profile: ""
  })

  console.log(chosenEmoji)
  //selected emoji
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };
  
  //click emoji 
  const showEmoji = () => {
    if (isEmojiClick) {
      setEmojiClick(false);
    } else {
      setEmojiClick(true);
    }
  }
  
  //messsages
  useEffect(() => {
    //retrieving messages
    axios.create({
      baseURL: "https://whatsapp-backendversion.herokuapp.com/"
    }).get("/getMessage").then((response) => {
      setMessage(response.data);
    })
  }, [])

  useEffect(() => {
    // capturing event
    var pusher = new Pusher('4f79555c3080807b1d69', {
      cluster: 'ap2'
    });
    var channel = pusher.subscribe('messagecontents');
    channel.bind('inserted', function (data) {
      setMessage([...messages, data])
    });
    //unmounting
    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [messages])
  
  // listen the redux store action
  useEffect(() => {
    setChatHead(state ? state : {
      name: "",
      email: "",
      profile: ""
    })
  }, [state])

  useEffect(() => {
    document.querySelector(".messageContainer").scrollTo(0, document.querySelector(".messageContainer").scrollHeight);
  }, [])

  useEffect(() => {
    window.addEventListener("resize", () => {
      setCurWidth(window.innerWidth)
    })
  }, [currWidth])

  const Navbar = ({ profile }) => {
    const previousPage = () => {
      history.push("/")
    }
    return (
      <>
        <div className="navbar">
          <div className="left">
            <ArrowBack className={(currWidth < 1100) ? "me-4 d-block" : "me-4 d-none"} onClick={previousPage} />
            <Avatar src={chatHead.profile} />
            <div id="head">
              <span><b>{chatHead.reciever_name}</b></span>
              <span id="time">last seen at 12:30 pm</span>
            </div>
          </div>
          <div className="right">
            <SearchOutlined id="searchIcon" />
            <MoreVert id="moreIcon" />
          </div>
        </div>
      </>
    )
  }

  const MessageContainer = () => {
    return (
      <>
        <div className="messageContainer">
          {
            state ? messages.map((data) => (
              ((data.reciever === chatHead.reciever && data.sender === curUser) || (data.reciever === chatHead.sender && data.sender === chatHead.reciever)) ?
                <Message
                  key={data._id}
                  name={data.name}
                  message={data.message}
                  timestamp={data.timestamp}
                  status={data.reciever === JSON.parse(localStorage.getItem("userData")).email ? "incoming" : "outgoing"} />
                : null
            )) :
              <WelcomeBanner />
          }
          {
            state && isEmojiClick ? <Picker onEmojiClick={onEmojiClick} id="emojiCollection" /> : null
          }
        </div>
      </>
    )
  }

  const Message = (props) => {
    return (
      <>
        {props.status === "incoming" ?
          <>
            <div className="incoming">
              <span id="text">{props.message}</span>
              <span id="time">&nbsp;&nbsp; {props.timestamp} </span>
            </div>
          </>
          :
          <>
            <div className="outgoing">
              <span id="text">{props.message}</span>
              <span id="time">&nbsp;&nbsp; {props.timestamp} </span>
            </div>
          </>
        }
      </>
    )
  }

  const Body = (props) => {
    return (
      <>
        <div className="body">
          <MessageContainer />
        </div>
      </>
    )
  }

  const sendMessage = async (e) => {
    try {
      e.preventDefault()
      const data = message.current.value;
      //send message to server using post http request
      await axios.post("https://whatsapp-clone-2b15a.firebaseapp.com/sendMessage", {
        sender: JSON.parse(localStorage.getItem("userData")).email,
        reciever: chatHead.reciever,
        message: data,
        timestamp: new Date().toLocaleTimeString(),
        recieved: false,
      })
      message.current.value = ""
    } catch (error) {
      console.log(error)
    }
  }
  const BottomNavbar = () => {
    return (
      <>
        <div className="bottomNav">
          <EmojiEmotions className="mx-2" id="emjoiIcon" onClick={showEmoji} />
          <AttachFile className="mx-2" id="fileIcon" />
          <input
            type="text"
            className="input form-control mx-2"
            ref={message}
            placeholder="Enter a message...." />
          <SendOutlined className="sendIcon mx-3" onClick={sendMessage} />
        </div>
      </>
    )
  }

  return (
    <div className="sidebar__chat">
      {
        state ?
      <>
        <Navbar />
        <Body />
        <BottomNavbar />
          </> : <Body />
      }
    </div>
  )
}

export default Chat
