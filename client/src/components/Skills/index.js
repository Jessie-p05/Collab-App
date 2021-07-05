import React, { useState } from "react";
// import Button from "../Button";
// import ProjectList from "../ProjectList";
import Select from "react-select";
import axios from "axios";
import Cookies from "universal-cookie";
import Button from "@material-ui/core/Button";


//mui
import Box from "@material-ui/core/Box";
import Menu from "@mui-treasury/components/menu/collapsible";
import { useJupiterCollapsibleMenuStyles } from "@mui-treasury/styles/collapsibleMenu/jupiter";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from '@material-ui/core/styles';


const cookies = new Cookies();
/**
 * The options array should contain objects.
 * Required keys are "name" and "value" but you can have and use any number of key/value pairs.
 */



const useStyles = makeStyles(() => ({
  root: {
    
    large: {
      width: 50,
      height: 50,
    }
  },
}));

export default function Skills(props) {
  const options = props.allSkills.map((skill) => {
    return { value: skill.id, label: skill.name, isFixed: true };
  });

  

  const currentUser = cookies.get("currentUser");
 

  const submitSkills = (props) => {
    const url = `http://localhost:5000/users/${currentUser}/skills`;
    return axios.post(url, { skills: state.mySkills }).then((body) => {
      updateUsers();
      props.backToHome();
    });
  };
  
  const  allItems = options.map(s => ({ name: s.label, id: s.value }));

  const [state, setState] = useState({
    initItems: allItems,
    items: allItems,
    selectedItem:[],
    mySkills:[]
  });
  
  
  const addSelectedItem = item => {
    let elm = state.initItems.find(i => i.name === item);
    setState((prev) => ({
      inputValue: "",
      ...prev,
      selectedItem: [...state.selectedItem, item],
      items: state.items.filter(i => i.name !== item),
      mySkills: [...state.mySkills, elm.id]
    }));
  }

  const removeSelectedItem = item => {
    let elm = state.initItems.find(i => i.name === item);
    setState((prev) => ({
      inputValue: "",
      ...prev,
      selectedItem: state.selectedItem.filter(i => i !== item),
      items: [...state.items, { name: item, id: elm.id }],
      mySkills: state.mySkills.filter(i => i !== elm.id)
    }));
  };

const updateUsers = () =>{
  
  const newUser = parseInt(currentUser);
  const user = props.users.find(user => user.id === parseInt(currentUser));
  const userToUpdate = {...user};
  const skills =[...state.mySkills];
  const user_skills = skills.map(skill => props.allSkills[skill - 1]);
  userToUpdate.user_skills = user_skills;
  const usersToUpdate = props.users.map(user => user.id === userToUpdate.id ? {...userToUpdate} : {...user});
  props.setState(prev => ({...prev,user: newUser, users :[...usersToUpdate]}));
}

  
  
  const classes = useStyles();

  return (
    <article style={{ marginBottom: "300px" }}>
      
      <Box minWidth={343} className={classes.root}>
        <Grid container justify="center">
        <Grid item>
        <img  src={"https://image.flaticon.com/icons/png/512/616/616490.png"} 
       style={{width: "100px",
        height: "100px"}}>
        </img>
        </Grid>
        </Grid>
        <Menu
          collapsed
          useStyles={useJupiterCollapsibleMenuStyles}
          renderToggle={({ onClick, collapsed }) => (
            <Menu.Row>
              <Menu.RowItem style={{fontSize:"40px"}}
              >
                Pick your talent skills
              </Menu.RowItem>
              <Menu.Action button toggled={collapsed} onClick={onClick} />
            </Menu.Row>
          )}


        >
          <Menu.List>
            {allItems.map((item, index) =>(
            <Menu.ListItem
              button
              selected={state.mySkills.includes(item.id)}
              onClick={()=>addSelectedItem(item.name)}
              style={{fontSize:"30px"}}
            >
              {item.name}
            </Menu.ListItem>
            ))}

          </Menu.List>
        </Menu>
        <Grid container justify="center"
        >
          <Grid item>
        <Button
              variant="contained"
              color="default"
              className={classes.button}
              onClick={() => submitSkills(props)}
            >
              Submit
            </Button>
            </Grid></Grid>
      </Box>

    </article>
  );
}
