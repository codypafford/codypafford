import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
class GameRules extends React.Component {
  render() {
    return (
      <Fragment>
        <h3 className="centerAlignText">Game Rules</h3>
        <div className="centerAlignText">
          Simple experimental game I made using Vanilla JavaScript
        </div>
        <br></br>
        <ul
          className="centerAlignText"
          style={{
            columnCount: "2",
            listStyleType: "none",
          }}
        >
          <li>
            <FontAwesomeIcon icon={faCheckCircle} /> &nbsp; Simply click as many
            green tiles as possible.
          </li>
          <li>
            <FontAwesomeIcon icon={faCheckCircle} /> &nbsp; Avoid clicking the
            red tiles. Those count against you.
          </li>
        </ul>
      </Fragment>
    );
  }
}

export default GameRules;
