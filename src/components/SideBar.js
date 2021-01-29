import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
  const [view, setView] = useState("");

  const viewChange = () => {
    setView(!view);
  };

  return (
    <div>
      <div
        className={`ui sidebar inverted vertical icon menu ${
          view === true ? "visible" : ""
        }`}
      >
        <Link className="item" onClick={() => viewChange()}>
          <i className="x icon"></i>
        </Link>
        <Link className="item" to="/">
          <i className="home icon"></i>
          Home
        </Link>
        <Link className="item" to="/chart">
          <i className="block layout icon"></i>
          Chart
        </Link>
        <Link className="item" to="/tchart">
          <i className="smile icon"></i>
          Tchart
        </Link>
      </div>
      <div className="pusher" style={{ marginLeft: "2rem" }}>
        <i
          className="align justify icon big"
          style={{ width: "20px", height: "30px" }}
          onClick={() => viewChange()}
        ></i>
      </div>
      {/* <div
        className={`ui sidebar inverted vertical menu ${
          view === true ? "visible" : ""
        }`}
        style={{ transition: "push" }}
      >
        <a className="item">1</a>
        <a className="item">2</a>
        <a className="item">3</a>
      </div>
      <div className="dimmed pusher">
        <button className="ui button" onClick={() => viewChange()}>
          Menu
        </button>
      </div> */}
    </div>
  );
}
