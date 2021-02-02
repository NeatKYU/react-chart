import React, { useState } from "react";
import { NavLink } from "react-router-dom";

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
        <div className="item" onClick={() => viewChange()}>
          <i className="x icon"></i>
        </div>
        <NavLink to="/">
          <div className="item">
            <i className="home icon"></i>
            Home
          </div>
        </NavLink>
        <NavLink to="/chart">
          <div className="item">
            <i className="block layout icon"></i>
            Chart
          </div>
        </NavLink>
        <NavLink to="/toast">
          <div className="item">
            <i className="smile icon"></i>
            Tchart
          </div>
        </NavLink>
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
