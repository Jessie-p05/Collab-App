import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { findUserById } from "../../helpers/selectors";
import axios from "axios";
import "./projectDetail.scss";

//material-ui
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ProjectDetail = (props) => {
  //const projectLead = findUserById(props.project.projectLeadId, props.users);

  const classes = useStyles();
  return (
    <article className="project-detail">
      <Card className={"MuiPostCard--01"}>
        <CardMedia className={"MuiCardMedia-root"} image={props.project.imgUrl}>
          <div className={"MuiTag--ribbon"}>
            <Typography color={"inherit"} className={"MuiTypography-root"}>
              Open
            </Typography>
          </div>
          <div>
            {props.project.project_users.map((member) => (
              <Avatar
                className={"MuiAvatar-root"}
                src={member.photo}
                onClick={() => props.pickAUser(member.id)}
              />
            ))}
          </div>
        </CardMedia>

        <CardContent className={"MuiCardContent-root"}>
          <Typography
            className={"MuiTypography--heading"}
            variant={"h5"}
            gutterBottom
          >
            {props.project.name}
          </Typography>
          <Typography className={"MuiTypography--subheading"} variant={"h6"}>
            {props.project.description}
          </Typography>
        </CardContent>
        <CardActions className={"MuiCardActions-root"}>
          {/* <Typography variant={"caption"}>
        <Link block href={"javascript:;"} underline={"none"}>
          March 8, 2016
        </Link>
      </Typography> */}
          <div>
            <IconButton>
              <Icon>share</Icon>
            </IconButton>
            <IconButton>
              <Icon>favorite_border_rounded</Icon>
            </IconButton>
          </div>
          <div>
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              onClick={() => props.chatToAGroup(props.project.id)}
            >
              Talk to us
            </Button>
          </div>
        </CardActions>
      </Card>
      {/* <h1>---------------Project Detail page----------------</h1>
      <h2>{props.project.name}</h2>
      <h3 onClick={() => props.pickAUser(props.project.projectLeadId)}>
        {`${projectLead.firstName}
        ${projectLead.lastName}`}
      </h3>
      <p>{props.project.description} </p>
      <img
      src={props.project.imgUrl}
      alt={props.project.name}
    />
      <Button onClick={()=>props.chatToAGroup(props.project.id)}>chatRoom</Button> */}
    </article>
  );
};

ProjectDetail.getTheme = (muiBaseTheme) => ({
  MuiCard: {
    root: {
      "&.MuiPostCard--01": {
        transition: "0.3s",
        maxWidth: "100%",
        margin: "auto",
        boxShadow: "0 0 20px 0 rgba(0,0,0,0.12)",
        "& .MuiCardMedia-root": {
          paddingTop: "20.25%",
          position: "relative",
          "& .MuiTag--ribbon": {
            position: "absolute",
            top: muiBaseTheme.spacing.unit * 2,
            left: muiBaseTheme.spacing.unit * 2,
            backgroundColor: muiBaseTheme.palette.secondary.main,
            color: "#ffffff !important",
            padding: "2px 8px",
            boxShadow: "0 2px 12px 2px rgba(0,0,0,0.5)",
            borderTopLeftRadius: 2,
            borderBottomLeftRadius: 2,
            "&:before, &:after": {
              position: "absolute",
              right: -16,
              content: '" "',
              borderLeft: `16px solid ${muiBaseTheme.palette.secondary.main}`,
            },
            "&:before": {
              top: 0,
              borderBottom: "12px solid transparent",
            },
            "&:after": {
              bottom: 0,
              borderTop: "12px solid transparent",
            },
            "& .MuiTypography-root": {
              fontWeight: "bold",
            },
          },
          "& .MuiAvatar-root": {
            position:"relative",
            left: "20%",
            bottom: 0,
            transform: "translateY(30%)",
            width: 100,
            height: 100,
            zIndex: 1,
            display: "inline-block",
            border: "2px solid white",
            "&:not(:first-of-type)": {
              marginLeft: -muiBaseTheme.spacing.unit,
            },
          },
          "&:after": {
            content: '" "',
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            borderBottom: "32px solid #ffffff",
            borderLeft: "400px solid transparent",
          },
        },
        "& .MuiCardContent-root": {
          textAlign: "left",
          padding: muiBaseTheme.spacing.unit * 3,
        },
        "& .MuiTypography--heading": {
          fontWeight: "bold",
        },
        "& .MuiTypography--subheading": {
          lineHeight: 1.8,
        },
        "& .MuiCardActions-root": {
          padding: `0 ${muiBaseTheme.spacing.unit * 3}px ${
            muiBaseTheme.spacing.unit * 3
          }px`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
      },
    },
  },
});
ProjectDetail.displayName = "Card";
ProjectDetail.metadata = {
  name: "Post Card",
  description: "Personal Post",
};

export default ProjectDetail;
