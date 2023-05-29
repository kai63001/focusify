"use client";
import Draggable from "react-draggable";

const Dragable = (props: any) => {
  return (
    <Draggable
      handle=".handle"
      bounds="parent"
      onStart={(e) => {
        if (props?.onDragStart) {
          props?.onDragStart(e);
        }
      }}
      onStop={(e) => {
        if (props?.onDragEnd) {
          props?.onDragEnd(e);
        }
      }}
      defaultPosition={{
        x: props.x == 0 ? Math.random() * (window.innerWidth - 500) : props.x,
        y: props.y == 0 ? Math.random() * (window.innerHeight - 500) : props.y,
      }}
    >
      <div
        onClick={(e) => {
          if (props?.onDragStart) {
            props?.onDragStart(e);
          }
        }}
        className="absolute"
        style={{ zIndex: props.index }}
      >
        {props.children}
      </div>
    </Draggable>
  );
};

export default Dragable;
