import React from "react";
import ProjectListItem from "./ProjectListItem";

export default function ProjectList(props) {

  const projects = props.projects.map((project, index) => {

    
    return (
      <ProjectListItem
        key={index}
        users={props.users}
        id = {project.id}
        name={project.name}
        imgUrl={project.imgUrl}
        projectLeadId={project.projectLeadId}
        description={project.description}
        project_skills={project.project_skills}
        project_messages={project.project_messages}
        project_users={project.project_users}
        project_goals={project.project_goals}
        pickAProject={props.pickAProject}
        pickAUser={props.pickAUser}
      />
    );
  });

  return <ul>{projects}</ul>;
}
