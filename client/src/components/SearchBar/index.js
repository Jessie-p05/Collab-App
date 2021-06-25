import React, {useState} from "react";
import axios from 'axios';
import { filterProjectsBySkills } from "../../helpers/selectors";

export default function SearchBar(props) {
  
  const [keyword, setKeyword] = useState([])

  const submitKeyword = () => {
    const url = `http://localhost:5000/projects/search`
    return axios.post(url, {"keyword": keyword})
      .then((body) => {
        let filteredProjects = filterProjectsBySkills(props.skills, body.data)
        props.setState(prev => ({...prev, projects: body.data, matchedProjects: filteredProjects}))
      })
  }

  const onKeywordChanged = (event) => {
    //console.log("Event in onKeywordChanged", event)
    const _keyword = document.getElementById("searchbar");
    setKeyword(_keyword.value)
  }

  return (
    <div style={{display: "flex", marginTop: "20px", width: "500px"}}>
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="searchbar" onChange={(word)=>onKeywordChanged(word)}></input>
      <button class="btn btn-outline-success" onClick={submitKeyword}>Search</button>
      <button class="btn btn-outline-success" onClick={props.reloadAllProjects} style={{ marginLeft: "10px", width: "150px"}}>Reload All</button>
    </div>
  )

}
