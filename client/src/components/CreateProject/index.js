//import React from 'react';
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  FormLabel,
  Input,
  Checkbox,
  Typography,
  Button,
  CssBaseline,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';
import axios from 'axios';
import Cookies from "universal-cookie";
import MultiChipSelect from "./multiChipSelect";


// creat project initiation;
  const cookies = new Cookies();
  const currentUser = cookies.get("currentUser");
//   const options = [
//     { key: "skillId1", value: 1, label: 'Javascript', isFixed: true },
//     { key: "skillId2", value: 2, label: 'React', isFixed: true},
//     { key: "skillId3", value: 3, label: 'Ruby', isFixed: true },
//     { key: "skillId4", value: 4, label: 'SQL', isFixed: true },
//     { key: "skillId5", value: 5, label: 'Express', isFixed: true },
//   ];
//  const  allItems = options.map(s => ({ name: s.label, id: s.value }));

  const initialValues = {
    id: 0,
    projectLeadId: Number(currentUser),
    name: "",
    description: "",
    project_skills: [],
    project_users: [],
    project_messages: [],
    url: "",
    imgUrl: "",
    deadline: "",
    startDate: "",
    endDate: ""
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: theme.spacing(2),
      padding: 10,
      margin: 'auto',
      maxWidth: '900px',


      '& .MuiTextField-root': {
        margin: 'theme.spacing(2)',
        width: '600px'
      },
      '& .MuiButtonBase-root': {
        margin: 'theme.spacing(1)',
      },
    },
  }));


export default function CreateProject(props) {
  const classes = useStyles();
  const [newProject, setNewProject] = useState(initialValues);

  // The skill table from the propos
  const  allItems = props.allSkills;

// The state for skill select
  const [state, setState] = useState({
    initItems: allItems,
    items: allItems,
    selectedItem:[],
    mySkills: []
  });

  const setItems = items => setState({ ...state, items });
  const setSelectedItem = selectedItem => setState((prev) => {
    return {...prev, selectedItem};
  });
  const setMySkills = mySkills => setState((prev) => {
    return {...prev, mySkills};
  });
  const handleChange = selectedItem => {
    if (state.selectedItem.includes(selectedItem)) {
      removeSelectedItem(selectedItem);
    } else {
      addSelectedItem(selectedItem);
    }
  };

  const addSelectedItem = item => {
    let elm = state.initItems.find(i => i.name === item);
    setState((prev) => ({
      inputValue: "",
      ...prev,
      selectedItem: [...state.selectedItem, item],
      items: state.items.filter(i => i.name !== item),
      mySkills: [...state.mySkills, elm]
    }));
  }

  const removeSelectedItem = item => {
    let elm = state.initItems.find(i => i.name === item);
    setState((prev) => ({
      inputValue: "",
      ...prev,
      selectedItem: state.selectedItem.filter(i => i !== item),
      items: [...state.items, { name: item, id: elm.id }],
      mySkills: state.mySkills.filter(i => i !== elm)
    }));
  };
  const lead = props.users.find(s => s.id === newProject.projectLeadId);

    // Final submit handler
    //(axios returns a complete project object with the id of database and ubdates the state)
    //skills will be inserted into the projects_skills table through the backend route
    //new project available through the state:project
    const submitNewProject = () => {

      const url = `http://localhost:5000/projects/new`
      return axios.post(url, {"projects": newProject})
        .then((data) => {

          setNewProject(prev => ({
            ...prev,
            id: data.data,
            project_users: [lead],
            project_skills: []
            }))
          const updateProject = [...props.projects,newProject];
          props.setProjects(prev => ({
            ...prev,
            updateProject}));
          const myProject = props.projects.find(project => project.id === data.data);
          console.log(myProject, newProject);
          props.pickAProject(newProject);
        })
        .catch(err => console.log(err))
      }

      // Change handler for all inputs except skills
      const handleInputChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setNewProject({
          ...newProject,
          [name]: value,
        });
      };

      // Change handler for selected skills
      const onSkillsChanged = (e) => {
       // e.preventDefault()
        setNewProject(prev => ({
          ...prev,
          project_skills: state.mySkills
        }))
      }
  return (

    <form className={classes.root} noValidate onSubmit={submitNewProject}>
    <div style={{
      padding: '20',
      margin: 'auto'
      }}>
      <CssBaseline />
      <Typography variant="h4" align="center" component="h1" gutterBottom>
      🏁🏁 New Project Form 🏁🏁
      </Typography>
      <Typography variant="h6" align="center" component="h2" gutterBottom>
        (All fields are required)
      </Typography>
    </div>
    <div>
          <TextField
            id='title'
            label="Title"
            variant="outlined"
            type='text'
            name='name'
            value={newProject.name}
            onChange={handleInputChange}
            style={{ margin: "10px" }}
          />
      </div>
      <div>
          <TextField
            id='description'
            label='Description'
            type='text'
            name='description'
            variant="outlined"
            value={newProject.description}
            onChange={handleInputChange}
            multiline
            rowsMax={4}
            style={{ margin: "10px" }}
          /><br />
      </div>
      <div>
      <FormGroup className={classes.paper}>
        <FormControl>
          <FormLabel style={{marginLeft:7}}>Find the skill needed for your project</FormLabel>
          <MultiChipSelect
            onInputValueChange={(e) => onSkillsChanged(e)}
            inputValue={state.inputValue}
            availableItems={state.items}
            selectedItem={state.selectedItem}
            onChange={(chip) => addSelectedItem(chip)}
            onRemoveItem={removeSelectedItem}
          />
        </FormControl>
      </FormGroup>
       </div>
       <div>
          <TextField
            id='URL'
            label="URL"
            variant="outlined"
            type='text'
            name='url'
            value={newProject.url}
            onChange={handleInputChange}
            style={{ margin: "10px" }}
          />
      </div>
      <div>
          <TextField
            id='imgURL'
            label="Image URL"
            variant="outlined"
            type='text'
            name='imgUrl'
            value={newProject.imageUrl}
            onChange={handleInputChange}
            style={{ margin: "10px" }}
          />
        </div>
        <br />
        <FormLabel htmlFor='deadLine'>Deadline</FormLabel><br /><br />
        <Input
            id='Deadline'
            type='date'
            name='deadline'
            value={newProject.deadline}
            placeholder='My Project deadline'
            onChange={handleInputChange}
        />
        <br />
        <FormLabel htmlFor='startDate'>Start Date</FormLabel><br /><br />
        <Input
            id='startDate'
            type='date'
            name='startDate'
            value={newProject.startDate}
            placeholder='My Project Start Date'
            onChange={handleInputChange}
        />
        <br />
        <FormLabel htmlFor='endDate'>End Date</FormLabel><br /><br />
        <Input
            id='endDate'
            type='date'
            name='endDate'
            value={newProject.endDate}
            placeholder='My Project End Date'
            onChange={handleInputChange}
        />
        <br />
            <FormLabel width={[1/2, 1/4]} p={2}>
            <Checkbox
                id='remember'
                name='remember'
            />
            Remember Me
            </FormLabel>
            <Button variant="secondary" style={{backgroundColor:"rgb(245, 133, 63)"}}
             onClick={submitNewProject}>Create</Button>
     </form>

  )
}
