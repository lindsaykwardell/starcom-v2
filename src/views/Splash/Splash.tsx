import React from "react";

import bg from "../../img/bg.jpg";

export default function Splash() {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,.75)",
          overflow: "hidden",
          color: "white"
        }}
      >
        <div
          style={{
            margin: "auto",
            marginTop: "45vh",
            width: "60vw",
            userSelect: "none"
          }}
        >
          <hr />
          <h1
            style={{
              fontFamily: `'Major Mono Display', monospace`,
              textAlign: "center"
            }}
          >
            Star Commander
          </h1>
          <hr />
        </div>
      </div>
    </div>
  );
}
