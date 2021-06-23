import React, { useState } from "react";
import Cookies from "universal-cookie";
import {findUserById} from '../../helpers/selectors';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const cookies = new Cookies();

export default function NavBar(props) {
  console.log(props);
  let userSkills = []
  if (props.userId) {
    let userToShow;
    userToShow = findUserById(props.userId, props.users)
    for (const user of props.users) {

      if (user.id === Number(props.userId)) {
        userToShow = user
      }
    }
    if (userToShow && userToShow.user_skills) {
      userSkills = userToShow.user_skills.map((skill)=>skill.id)
    }
  }
  const isLoggedIn = cookies.get("currentUser");

  const logout = () => {
    cookies.remove("currentUser");
  };
  // <nav className="navbar navbar-light navbar-expand-lg fixed-top" style={{background: "rgba(184, 222, 233, 0.2)"}}>
  return (
    <nav className="navbar navbar-light navbar-expand-lg fixed-top" style={{backgroundImage: "linear-gradient(to right, #FF855C, #F5853F)"}}>
      <div className="container-fluid">
        <div>
          <img style={{width: "40px", height: "40px", marginBottom: "10px", marginRight: "10px"}} src="https://www.svgrepo.com/show/286204/connections-scheme.svg"></img>
          <a style={{color: "white"}} className="navbar-brand navbutton" onClick={props.backToHome}>
            CollabApp
          </a>
        </div>
      </div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
          <span class="navbar-toggler-icon"></span>
      </button>
    <div class="navbar-collapse collapse order-3 dual-collapse2">
        {isLoggedIn ? (
          <ul class="navbar-nav ml-auto">
          
          
          <li className="nav-item">
            <a style={{color: "white"}} className="nav-link text-nowrap navbutton" onClick={props.createNewProject}>Create A Project</a>
          </li>
          <li className="nav-item">
            <a style={{color: "white"}} className="nav-link text-nowrap navbutton" onClick={() => {
                cookies.remove("currentUser");
                window.location.reload();
                }}>
              Logout
            </a>
          </li>
          
          <li className="nav-item navbutton" onClick={()=> props.myProfile()} style = {{ marginRight : 15, marginLeft:5 }}>
          <AccountCircleIcon />
          </li>
            
          </ul>
          
        ) : (
          <ul class="navbar-nav ml-auto">
          <div style={{display: "flex", marginRight: "10px"}}>
            <li>
              <a style={{color: "white"}} className="nav-link text-nowrap navbutton" onClick={props.registration}>
                Register
              </a>
            </li>
            <li>
              <a style={{color: "white"}} className="nav-link text-nowrap navbutton" onClick={()=>{
                  cookies.set("currentUser", 1, { path: "/" })
                  window.location.reload()
                }}>
                Login
              </a>
            </li>
          </div>
          </ul>
        )}
    </div>
    </nav>
  );
}

