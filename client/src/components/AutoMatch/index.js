import React, {useState} from "react";
import { filterProjectsBySkills, findUserById } from "../../helpers/selectors";
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
};

export default function AutoMatch(props){
  let thisUser = null;
  thisUser = findUserById(Number(props.userId), props.users)
  
  let currentUserSkills;
  if (thisUser) {
    currentUserSkills = thisUser.user_skills.map((skill)=>{return skill.id})
    
  }
  
  function autoMatch(skills) {
    console.log("skills", skills, "currentUserSkills", currentUserSkills, "props.skills:", props.skills)
    props.skillFilter(skills, true);
  }

  return (
    <button className="btn-ultra-voilet" onClick={()=>autoMatch(currentUserSkills)}>AutoMatch</button>
    
  )
}