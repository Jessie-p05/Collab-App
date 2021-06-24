import { useState, useEffect } from "react";
const axios = require("axios").default;

export default function useApplicationData() {

  const [state, setState] = useState({
    user: null,
    project: null,
    users: [],
    projects: [],
    roomName:"",
    skills: [],
    matchedProjects: [],
    allSkills: [],
    showSkills: false
  });



  // fetch the initial data in database;
  useEffect(() => {

    // axios.defaults.baseURL = "http://localhost:5000";
    Promise.all([
      axios.get("/projects"),
      axios.get("/users"),
      axios.get("/projects/skills"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        projects: all[0].data,
        matchedProjects: all[0].data,
        users: all[1].data,
        allSkills: all[2].data
      }));
    });
  }, []);



  //update project state when user click on a project
  const setProject = (project) => setState({ ...state, "project": project });
  //update user state when user click on a user
  const setUser = (user) => setState({ ...state, "user": user });

  //update projects state when user do a search
  const setProjects = (projects) => setState({ ...state, "projects": projects });
  
  const setMatchedProjects = (matchedProjects) => setState({ ...state, "matchedProjects": matchedProjects });

  const setUsers = (users) => setState({ ...state, "users": users });
  
  const setShowSkills = (showSkills) => setState({ ...state, "showSkills": showSkills });

  const setRoomName = (roomName) => setState({ ...state, "roomName": roomName });
  
  const setSkills = (newSkills) => {
    
    setState({...state, skills: newSkills})
  };
  
  return { state, setState, setProject, setProjects, setUser, setUsers, setRoomName, setSkills, setMatchedProjects, setShowSkills};
}
