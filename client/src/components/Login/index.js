// import React from "react";
import React, { useState } from "react";
import Button from "../Button";
import Cookies from "universal-cookie";

const cookies = new Cookies();


export default function Login(props) {

  const [email, setEmail] = useState(props.email || "");
  const [password, setPassword] = useState(props.email || "");
  // Finding the user by email from the client side users and check the password
  const submitLogin = () => {
    const theUser = props.users.find(user => user.email === email);
    // console.log("user!!",theUser)
    if(theUser && theUser.password === password) {
      cookies.set("currentUser", theUser.id, { path: "/" });
      props.pickSkills();
    } else if (theUser && theUser.password !== password) {
      alert("Incorrect password, please try again")
    } else alert("Please navigate to registration page and register")

  };
  return (
    <article>
      <h2>--------------------Register-----------------</h2>

      <div>
        <input
          className="appointment__create-input text--semi-bold"
          name="email"
          type="text"
          value={email}
          placeholder={"Enter Email"}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <input
          className="appointment__create-input text--semi-bold"
          name="password"
          type="text"
          value={password}
          placeholder={"Enter password"}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <Button onClick={() => submitLogin()}>Log In</Button>

    </article>

      // <div
      //     id="myModal"
      //     class="modal hide fade"
      //     tabindex="-1"
      //     role="dialog"
      //     aria-labelledby="myModalLabel"
      //     aria-hidden="true"
      // >
      // <div class="modal-header">
      //   <button
      //     type="button"
      //     class="close"
      //     data-dismiss="modal"
      //     aria-hidden="true"
      //   >
      //     ×
      //   </button>
      //   <h3 id="myModalLabel">Log in</h3>
      // </div>
      // <div class="modal-body">
      //   <form class="form-horizontal" class="form-inline" action="/login" method="POST">
      //     <div class="control-group">
      //       <label class="control-label center" for="inputName">Name</label>
      //       <div class="controls">
      //         <input type="text" id="inputName" placeholder="Name" />
      //       </div>
      //     </div>
      //     <div class="control-group">
      //       <label class="control-label" for="inputPassword">Password</label>
      //       <div class="controls">
      //         <input
      //           type="password"
      //           id="inputPassword"
      //           placeholder="Password"
      //         />
      //       </div>
      //     </div>
      //     <div class="control-group">
      //       <div class="controls">
      //         <label class="checkbox">
      //           <input type="checkbox" /> Remember me
      //         </label>
      //       </div>
      //     </div>

      // </div>

      // <div class="modal-footer">
      //   <button class="btn" data-dismiss="modal" aria-hidden="true">
      //     Close
      //   </button>
      //   <button type="submit" class="btn btn-primary">Sign in</button>
      // </form>
      // </div>
      // </div>
  );
}
