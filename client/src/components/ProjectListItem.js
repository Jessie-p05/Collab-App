import React from "react";
// import "components/DayListItem.scss";

// const classnames = require('classnames');

export default function ProjectListItem(props) {
  // const itemClass = classnames("day-list__item", {
  //   "day-list__item--selected": props.selected, "day-list__item--full": props.spots === 0
  // })

  

  return (
    <li >
      <h2 onClick ={() => props.pickAProject(props)} >{props.name}</h2>
      <h3 onClick ={() => props.pickAUser(props.user)}>{props.lead}</h3>
      <p >{props.description}</p>
    </li>
  );
}