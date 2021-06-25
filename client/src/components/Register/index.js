import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import axios from "axios";
import Cookies from "universal-cookie";

// creat new user initiation;
const cookies = new Cookies();

const initialValues = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  project_users: [],
};
// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function CreateProject(props) {
  const classes = useStyles();
  const [newUser, setNewUser] = useState(initialValues);

  // Final registration handler
  //(axios returns a complete user object with the id of database and ubdates the state)
  //new user available through the state:newUser
  const submitNewUser = (e) => {
    e.preventDefault();
    const url = `http://localhost:5000/register`;
    return axios
      .post(url, {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
      })
      .then((data) => {
        if (data.data.id !== 0) props.setUsers([...props.users, data.data]);
        else alert("You ID has not been recieved");
        props.pickSkills();
        cookies.set("currentUser", data.data.id, { path: "/" });
      })
      .catch((err) => console.log(err));
  };

  // Change handler for all inputs except skills
  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  return (
    // <form className={classes.root} noValidate onSubmit={submitNewUser}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={newUser.firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={newUser.lastName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={newUser.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={newUser.password}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "rgb(245, 133, 63)" }}
            className={classes.submit}
            onClick={submitNewUser}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
       
      </Box>
    </Container>

    /* <div
        style={{
          padding: "20",
          margin: "auto",
        }}
      >
        <CssBaseline />
        <Typography variant="h4" align="center" component="h1" gutterBottom>
          🏁🏁 Registration Form 🏁🏁
        </Typography>
        <Typography variant="h6" align="center" component="h2" gutterBottom>
          (All fields are required)
        </Typography>
      </div>
      <div>
        <TextField
          id="firstName"
          label="Your First Name"
          variant="outlined"
          type="text"
          name="firstName"
          value={newUser.firstName}
          onChange={handleInputChange}
          style={{ margin: "10px" }}
        />
      </div>
      <div>
        <TextField
          id="lasttName"
          label="Your Last Name"
          variant="outlined"
          type="text"
          name="lastName"
          value={newUser.lastName}
          onChange={handleInputChange}
          style={{ margin: "10px" }}
        />
        <br />
      </div>
      <div>
        <TextField
          id="email"
          label="Your Email"
          variant="outlined"
          type="text"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          style={{ margin: "10px" }}
        />
      </div>
      <div>
        <TextField
          id="password"
          label="Your Password"
          variant="outlined"
          type="text"
          name="password"
          value={newUser.password}
          onChange={handleInputChange}
          style={{ margin: "10px" }}
        />
      </div>
      <br />

      <FormLabel width={[1 / 2, 1 / 4]} p={2}>
        <Checkbox id="remember" name="remember" />
        Remember Me
      </FormLabel>
      <Button
        variant="secondary"
        style={{ backgroundColor: "rgb(245, 133, 63)" }}
        onClick={submitNewUser}
      >
        Register
      </Button>
    </form> */
  );
}
