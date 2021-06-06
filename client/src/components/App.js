import React from "react";
import { useState, useEffect } from "react";
// import "./App.css";

import Display from "./Display";
import MatchProject from "./MatchProject";

import useVisualMode from "../hooks/useVisualMode";
import Button from "./Button";

function App() {
  const projects = [
    {
      id: 1,
      name: "react-app",
      lead: "Amy",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
    {
      id: 2,
      name: "Ruby",
      lead: "Bell",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  ];
  // this.state = projects
  const DISPLAY = "DISPLAY";
  const MATCH = "MATCH";
  const { mode, transition, back } = useVisualMode(DISPLAY);
  // const [state, setState] = useState({
  //   projects: [],
  // });

  function onMatch() {
    transition(MATCH);
  }
  function backToHome() {
    transition(DISPLAY);
  }

  return (
    <main>
      <section>
        <div>
          <h2>navbar</h2>
          <Button onClick={backToHome}>home</Button>
        </div>
      </section>

      <section>
        {mode === DISPLAY && <Display projects={projects} onMatch={onMatch} />}
        {mode === MATCH && <MatchProject projects={projects.slice(1)} />}
      </section>

      <section>
        <h1>footer</h1>
      </section>
    </main>
  );
}

export default App;
