import React, { Component, Fragment } from "react";
import {
  Button,
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Row,
} from "react-bootstrap";

import GameRules from "./GameRules";
import { isMobile } from "react-device-detect";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: "DOWN",
      xCoord: 5,
      yCoord: 5,
      numOfWrongClicks: 0,
      numOfGoodClicks: 0,
      numOfMissedClicks: 0,
      totalPossibleClicks: 0,
      speed: 800,
      numOfTilesXAndY: 10,
      showRules: true,
    };

    this.hideGameRules = this.hideGameRules.bind(this);
  }

  determineWhichToColor(rows, cols) {
    let xc = this.state.xCoord;
    let yc = this.state.yCoord;
    let direction = this.state.direction;
    if (direction === "DOWN") {
      if (xc === rows - 1) {
        // TODO: determine if we should go right or left. which has a longer distance?
        this.setState({ direction: "RIGHT" }, function () {
          this.setState({ yCoord: yc + 1 }, function () {
            this.makeRows(rows, cols, this.state.xCoord, this.state.yCoord);
          });
        });
      } else {
        this.setState({ xCoord: xc + 1 }, function () {
          this.makeRows(rows, cols, this.state.xCoord, this.state.yCoord);
        });
      }
    }
    if (direction === "RIGHT") {
      if (yc === cols - 1) {
        // TODO: determine if we should go up or down. which has a longer distance?
        this.setState({ direction: "UP" }, function () {
          this.setState({ xCoord: xc - 1 }, function () {
            this.makeRows(rows, cols, this.state.xCoord, this.state.yCoord);
          });
        });
      } else {
        this.setState({ yCoord: yc + 1 }, function () {
          this.makeRows(rows, cols, this.state.xCoord, this.state.yCoord);
        });
      }
    }

    if (direction === "UP") {
      if (xc === 0) {
        // TODO: determine if we should go left or right. which has a longer distance?
        this.setState({ direction: "LEFT" }, function () {
          this.setState({ yCoord: yc - 1 }, function () {
            this.makeRows(rows, cols, this.state.xCoord, this.state.yCoord);
          });
        });
      } else {
        this.setState({ xCoord: xc - 1 }, function () {
          this.makeRows(rows, cols, this.state.xCoord, this.state.yCoord);
        });
      }
    }

    if (direction === "LEFT") {
      if (yc === 0) {
        // TODO: determine if we should go left or right. which has a longer distance?
        this.setState({ direction: "DOWN" }, function () {
          this.setState({ xCoord: xc + 1 }, function () {
            this.makeRows(rows, cols, this.state.xCoord, this.state.yCoord);
          });
        });
      } else {
        this.setState({ yCoord: yc - 1 }, function () {
          this.makeRows(rows, cols, this.state.xCoord, this.state.yCoord);
        });
      }
    }
  }

  randomClickerGame(rows, cols) {
    var x = Math.floor(Math.random() * (rows + 1) + 0);
    var y = Math.floor(Math.random() * (cols + 1) + 0);
    var this_ref = this;
    var bomb = false;
    if (((x + y) / 3) % 3 == 1 || ((x + y) / 3) % 3 == 0) {
      bomb = true;
      this.makeRows(rows, cols, x, y, this_ref, bomb);
    } else {
      this.makeRows(rows, cols, x, y, this_ref, bomb);
    }
  }

  componentDidMount() {
    document.title = "Game";
    if (isMobile) {
      this.setState({ numOfTilesXAndY: 8 });
      this.setState({ speed: 400 });
    }
    this.interval = setInterval(() => {
      if (!this.state.showRules) {
        this.randomClickerGame(
          this.state.numOfTilesXAndY,
          this.state.numOfTilesXAndY
        );
      }
    }, this.state.speed);
  }

  checkClick(e) {
    if (e.target.getAttribute("data-colored") === "true") {
      if (e.target.getAttribute("data-bomb") === "true") {
        var wrong = this.state.numOfWrongClicks;
        this.setState({ numOfWrongClicks: wrong + 1 });
      } else {
        var good = this.state.numOfGoodClicks;
        this.setState({ numOfGoodClicks: good + 1 });
      }
    } else {
      var wrong = this.state.numOfWrongClicks;
      this.setState({ numOfWrongClicks: wrong + 1 });
    }
  }

  hideGameRules() {
    this.setState({ showRules: false });
  }

  makeRows(rows, cols, colorX, colorY, this_ref, color_bomb) {
    var cellToColorX = colorX;
    var cellToColorY = colorY;
    const container = document.getElementById("gcontainer");
    while (container.firstChild) {
      container.firstChild.remove();
    }
    container.style.setProperty("--grid-rows", rows);
    container.style.setProperty("--grid-cols", cols);
    var x = 0;
    var y = 0;
    var onRow = 1;
    var onCol = 1;
    for (var c = 0; c < rows * cols; c++) {
      let cell = document.createElement("button");
      cell.innerText = c + 1;
      cell.setAttribute("data-x", x);
      cell.setAttribute("data-y", y);
      cell.addEventListener("click", function (e) {
        this_ref.checkClick(e);
      });
      if (c == onRow * cols - 1) {
        x = x + 1;
        onRow = onRow + 1;
      }
      // --------
      y = y + 1;
      if (c == onCol * rows - 1) {
        y = 0;
        onCol = onCol + 1;
      }
      container.appendChild(cell).className = "grid-item gameBtns";
      if (
        cell.getAttribute("data-x") == cellToColorX &&
        cell.getAttribute("data-y") == cellToColorY
      ) {
        if (color_bomb) {
          cell.style = "color:white; background-color:red";
          cell.setAttribute("data-bomb", "true");
        } else {
          cell.style = "color:white; background-color:green";
          cell.setAttribute("data-bomb", "false");
        }
        cell.setAttribute("data-colored", "true");
      }
    }
  }

  // TODO: make stylesheet for all styles instead of inline styling
  render() {
    return (
      <Fragment>
        <div
          className="container game-container-wrap"
          style={isMobile ? { zoom: 0.8 } : { zoom: 1 }}
        >
          <div style={{ backgroundColor: "#FAF9F6", paddingTop: "20px" }}>
            <div
              className="center-element-justified"
              style={{ paddingBottom: "20px" }}
            >
              <div className="gameDescriptions">
                # of wrong clicks: {this.state.numOfWrongClicks}
              </div>
              <div className="gameDescriptions">
                # of correct clicks: {this.state.numOfGoodClicks}
              </div>
              <div className="gameDescriptions">
                Difficulty: {this.state.speed}
              </div>
            </div>
            {this.state.showRules ? (
              <div>
                <GameRules />
                <div className="centerAlignText">
                  <button
                    style={{
                      backgroundColor: "green",
                      borderRadius: "50px",
                      margin: "20px",
                    }}
                    onClick={this.hideGameRules}
                  >
                    PLAY
                  </button>
                </div>
              </div>
            ) : (
              <div id="gcontainer" className="center-element-justified"></div>
            )}
            <div id="game_rules"></div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Game;
