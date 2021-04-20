import React from "react";

export default (props) => {
  const cvs = (
    <canvas
      style={{
        border: "4px dashed black",
      }}
      id="canvasboard"
      ref = {props.cvsRef}
    />
  );

  return (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: 15,
      }}
    >
      {cvs}
    </section>
  );
};
