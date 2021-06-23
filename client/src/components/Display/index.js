import React from "react";
import ProjectList from "../ProjectList";


export default function Display(props) {
return (
  <article>
    <ProjectList 
    user = {props.user}
    users = {props.users}
    projects={props.projects}
    pickAProject = {props.pickAProject}
    pickAUser = {props.pickAUser}
    />
  </article>
)} 