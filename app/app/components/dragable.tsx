"use client";
import Draggable from "react-draggable";

const Dragable = (props: any) => {
  return (
    <Draggable
      handle=".handle"
      bounds="parent"
      onStop={(e) => {
        if (props?.onDragEnd) {
          props?.onDragEnd(e);
        }
      }}
      defaultPosition={{
        x: props.x ?? Math.random() * (window.innerWidth - 500),
        y: props.y ?? Math.random() * (window.innerHeight - 500),
      }}
    >
      <div className="absolute" style={{ zIndex: 10 }}>
        {props.children}
      </div>
    </Draggable>
  );
};

export default Dragable;
