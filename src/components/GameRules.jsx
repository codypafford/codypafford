import React, { Component, Fragment } from "react";
class GameRules extends React.Component {
  render() {
    return (
      <Fragment>
        <h3 className="centerAlignText">Game Rules</h3>
        <div className="centerAlignText">
          Simple experimental game I made using Vanilla JavaScript
        </div>
        <br></br>
        <ul>
          <li>Game does not work correctly on mobile devices</li>
          <li>Simply click as many green tiles as possible.</li>
          <li>Choose the difficulty and hit play.</li>
        </ul>
      </Fragment>
    );
  }
}

export default GameRules;
