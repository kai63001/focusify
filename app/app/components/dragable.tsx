"use client";
import React from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";

const Dragable = (props: any) => {
  return (
    <Draggable
      handle=".handle"
      defaultPosition={{
        x: window.innerWidth / 2 - 100,
        y: window.innerHeight / 2 - 100,
      }}
      bounds="parent"
    >
      <div className="z-50 absolute">{props.children}</div>
    </Draggable>
  );
};

export default Dragable;
