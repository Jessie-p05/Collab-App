import React, {useState} from "react";
import { findMentors, getUserSkillsArray } from "../../helpers/selectors";
import styles from './mentor.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Select from 'react-select';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import SkillList from "../SkillList";

export default function MentorRequest(props) {

  // const [state, setState] = useState({});
  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [skills, setSkills] = useState([]);
  // const skills = [];
  const [mentors, setMentors] = useState(findMentors(props.users, skills));

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const options = props.allSkills.map((skill)=>{
    return {value: skill.id, label: skill.name, isFixed: true}
  })

  const onSkillsChanged = (e) => {
    const _skills = []
    console.log(e)
    for (const elem of e) {
      _skills.push(elem.value)
    }
    setSkills(_skills)
    setMentors(findMentors(props.users, _skills));
  }

  const sendMentorRequest = () => {

  }

  const handleMentorSkills = (skill) => {
    const newSkills = skills
    if (skills.includes(skill)) {
      const index = newSkills.indexOf(skill);
      newSkills.splice(index, 1);
    } else {
      newSkills.push(skill)
    }
    setSkills(newSkills);
    setMentors(findMentors(props.users, skills));
    // setState(prev => ({...prev, skills: newSkills, mentors: findMentors(props.users, skills)}))
  }

  const mentorList = (mentors.map((mentor)=>{

    return(
      <div onClick={()=>console.log("mentor:", mentor)}>
          <img src={mentor.photo} />
          <p className="legend">
            {mentor.firstName} {mentor.lastName}<br></br>{mentor.user_skills.map((skill) => skill.name + " ")}
          </p>
      </div>
    
    // <div className="box">
    //   <div>{mentor.firstName} {mentor.lastName}</div>
    //   <img src={mentor.photo}></img>
    //   {getUserSkillsArray(mentor.user_skills).map((skill)=>{
    //     return (<h2>{skill}</h2>)
    //   })}
    //   </div>
      
      )
  }))
  return (
    <div>
    <Button variant="info" onClick={handleShow} style={{backgroundColor:"lightblue",borderColor:"lightblue"}}>
      View Available Mentors
    </Button>

    <Modal dialogClassName="mentormodal" show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Make A Mentor Request!</Modal.Title>
        
      </Modal.Header>

      <Modal.Body style={{display: "flex", flexFlow: "column wrap", alignItems: "center"}}>
        <div>
          <p>Choose the skills you need:</p>
          <Select
            // defaultValue={[colourOptions[2], colourOptions[3]]}
            onChange={onSkillsChanged}
            isMulti

            name="skills"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
          />
          {/* <SkillList
            allSkills={props.allSkills}
            skills={skills}
            pickASkill={handleMentorSkills}
          /> */}
          <br></br>
        </div>
        <div>
          <div className="form-group">
            <label for="description">Write a description of your problem</label>
            <input name="description" className="form-control" type="text"></input>
          </div>
          <br></br>
          <div className="wrap">
            <Carousel showIndicators={false}>
              {mentorList}
            </Carousel>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={()=>{handleClose()}}>Close</Button>
        <Button variant="primary" onClick={()=>{alert("mentor request sent")}}>Send Mentor Request</Button>
      </Modal.Footer>
    </Modal>

    </div>

  );
}

