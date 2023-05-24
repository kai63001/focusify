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
    >
      <div className="z-50 absolute">{props.children}</div>
    </Draggable>
  );
};

export default Dragable;
