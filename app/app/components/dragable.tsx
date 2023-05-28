"use client";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";

const Dragable = (props: any) => {
  const [windowWidth, setWindowWidth] = React.useState(1);
  const [windowHeight, setWindowHeight] = React.useState(1);

  return (
    <Draggable
      handle=".handle"
      bounds="parent"
      defaultPosition={{
        x: window.innerWidth / 2 - 200,
        y: window.innerHeight / 2 - 200,
      }}
    >
      <div className="absolute" style={{ zIndex: 10 }}>
        {props.children}
      </div>
    </Draggable>
  );
};

export default Dragable;
