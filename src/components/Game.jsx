import React, { Component, Fragment } from "react";
import {
  Button,
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Row,
} from "react-bootstrap";

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
      speed: 700,
    };
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
    this.makeRows(rows, cols, x, y, this_ref);
  }

  componentDidMount() {
    document.title = "Game";
    // this.interval = setInterval(() => this.determineWhichToColor(10, 10), 500);
    this.interval = setInterval(
      () => this.randomClickerGame(10, 10),
      this.state.speed
    );
  }

  checkClick(e) {
    if (e.target.getAttribute("data-colored") === "true") {
      var good = this.state.numOfGoodClicks;
      this.setState({ numOfGoodClicks: good + 1 });
    } else {
      var wrong = this.state.numOfWrongClicks;
      this.setState({ numOfWrongClicks: wrong + 1 });
    }
  }

  makeRows(rows, cols, colorX, colorY, this_ref) {
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
      let cell = document.createElement("div");
      cell.innerText = c + 1;
      cell.setAttribute("data-x", x);
      cell.setAttribute("data-y", y);
      cell.addEventListener("click", function (e) {
        this_ref.checkClick(e);
        console.log(e.target);
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
      container.appendChild(cell).className = "grid-item";
      if (
        cell.getAttribute("data-x") == cellToColorX &&
        cell.getAttribute("data-y") == cellToColorY
      ) {
        cell.style = "color:white; background-color:green";
        cell.setAttribute("data-colored", "true");
      }
    }
  }

  // TODO: make stylesheet for all styles instead of inline styling
  render() {
    return (
      <Fragment>
        <div style={{ backgroundColor: "#FAF9F6" }}>
          <div style={{ display: "inline-block" }}>
            <div style={{ paddingLeft: "60px", color: "green" }}>
              # of wrong clicks: {this.state.numOfWrongClicks}
            </div>
            <div style={{ paddingLeft: "60px", color: "green" }}>
              # of correct clicks: {this.state.numOfGoodClicks}
            </div>
            {/* <div style={{ padingLeft: "20px", color: "green" }}>
              # of missed clicks: {this.state.numOfMissedClicks}
            </div> */}
            <div style={{ paddingLeft: "60px", color: "green" }}>
              Choose Difficulty:
              {this.state.speed}
            </div>
          </div>

          <div className="content">
            <div id="gcontainer"></div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Game;
