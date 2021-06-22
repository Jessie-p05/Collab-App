import React from "react";
import ProjectInfo from "./ProjectInfo";
import useChat from "../../hooks/useChat";
import { findUserById } from "../../helpers/selectors";
import MentorRequest from "../MentorRequest";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


import "./goal.css";
import "./chatBox.scss";
import "./index.scss";
import Cookies from "universal-cookie";

//card material ui
import JssProvider from "react-jss/lib/JssProvider";
import { createGenerateClassName } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

const muiBaseTheme = createMuiTheme();

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true
});

const cookies = new Cookies();

export default function ChatRoom(props) {
  
  //TODO: button to submit request to join in a group
  const { roomId } = props.roomName;
  const leadId = props.project.project_users[0].id;
  const { messages, sendMessage } = useChat(roomId,leadId);
  // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = React.useState(""); // Message to be sent

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
    //   };
  };


  
  
  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  messages.map((msg) => {
    const sender = findUserById(parseInt(msg.senderId), props.users);
    return (msg.name = sender.firstName + " " + sender.lastName);
  });

  const projectLead = findUserById(props.project.projectLeadId, props.users)
  const roomMember = props.project.project_users;
  const currentUser = cookies.get("currentUser");
  const roomTalkers = [...roomMember];
  roomTalkers.push(props.users.find((ele) => ele.id === parseInt(currentUser)));
  

  
  return (
    <>
    <div className="main-box">
      <section className="wrapper chatBox">
        <div className="nav" id="nav">
          <div className="default-nav">
            <div className="main-nav">

              {roomMember.map((member) => (
                <div className="toggle">
                  <img src={member.photo} className="main-nav-item"></img>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="inner" id="inner">
          <div className="chatContent" id="chatContent">
            {messages.map((message, i) => (
              <div
                key={i}
                className={`message-wrapper ${
                  message.senderId === currentUser ? "me" : "them"
                }`}
              >
                <div className="circle-wrapper animated bounceIn">
                  <img
                    className="circle-wrapper"
                    src={
                      roomTalkers.find(
                        (ele) => ele.id === parseInt(message.senderId)
                      ).photo || "https://image.flaticon.com/icons/png/512/3011/3011270.png"
                    }
                  ></img>
                </div>
                <div className="text-wrapper animated fadeIn">
                  {message.body}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bottom">
          <textarea
            value={newMessage}
            onChange={handleNewMessageChange}
            placeholder="Write message..."
            className="new-message-input-field input"
          />
          <button
            onClick={handleSendMessage}
            className="send-message-button send"
          ></button>
        </div>
      </section>
      
      <div style={{position: "absolute", display: "block", marginTop: "600px", left: "30px"}}>
        <MentorRequest
        users={props.users}
        allSkills={props.allSkills}
        />
      </div>
      <div style={{position: "absolute", display: "block", marginTop: "600px", left: "560px"}}>
        <Button onClick={handleClick} style ={{backgroundColor:"lightblue"}}>Join Us</Button>
      </div>


  
<JssProvider generateClassName={generateClassName}>
      <MuiThemeProvider
        theme={createMuiTheme({
          typography: {
            useNextVariants: true
          },
          overrides: ProjectInfo.getTheme(muiBaseTheme)
        })}
      >
       
       
        <ProjectInfo 
         users={props.users}
         project={props.project}
         projects={props.projects}
         setState={props.setState}
         pickAUser={props.pickAUser}
        />
      </MuiThemeProvider>
    </JssProvider>
      </div>
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={`Your request has been sent to ${projectLead.firstName} ${projectLead.lastName}`}
          action={
            <React.Fragment>
              <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
              </Button>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>

    </>
    
  );
}


