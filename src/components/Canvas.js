import React from "react";

export default (props) => {
  const cvs = (
    <canvas
      style={{
        border: "4px solid black",
        borderRadius: 0,
        backgroundColor:'white'
      }}
      id="canvasboard"
      ref={props.cvsRef}
    />
  );

  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {cvs}
    </section>
  );
};
