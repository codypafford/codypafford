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

class WordleGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRules: true,
      word: "apple",
      answerBoxToWriteTo: 0,
      arrayOfLettersPicked: [],
    };

    this.hideGameRules = this.hideGameRules.bind(this);
    this.checkSolution = this.checkSolution.bind(this);
  }

  componentDidMount() {
    document.title = "Game";

    this.makeRows(this);
    this.makeAnswerArea(this);
  }

  hideGameRules() {
    this.setState({ showRules: false });
  }

  selectLetterOnClick(e) {
    var selectedLetter = e.target.getAttribute("data-letter");
    console.log("put in " + selectedLetter);
    var new_arr = this.state.arrayOfLettersPicked.concat([selectedLetter]);
    var ii = this.state.answerBoxToWriteTo;
    this.setState(
      { answerBoxToWriteTo: ii + 1 },
      this.setState(
        {
          arrayOfLettersPicked: new_arr,
        },
        this.makeAnswerArea(this, new_arr)
      )
    );
  }

  selectIndexOfAnswerBoxToWriteTo(e) {
    var i = e.target.getAttribute("data-answer-area-index-num");
    var arr = this.state.arrayOfLettersPicked;
    var arr = arr.splice(0, i);
    this.setState(
      { arrayOfLettersPicked: arr },
      this.setState({ answerBoxToWriteTo: i }),
      this.makeAnswerArea(this, arr)
    );
    // also need to remove all items from array after that specified index
  }

  makeAnswerArea(this_ref, arrayOfLettersPicked) {
    console.log("making answer area: ");
    console.log(this.state.arrayOfLettersPicked);
    const container = document.getElementById("answer_box");
    while (container.firstChild) {
      container.firstChild.remove();
    }
    var lettersAlreadyPicked = arrayOfLettersPicked;
    for (let i = 0; i < this.state.word.length; i++) {
      let cell = document.createElement("button");
      try {
        if (lettersAlreadyPicked[i]) {
          cell.innerText = lettersAlreadyPicked[i];
        } else {
          cell.innerText = "...";
          cell.style = "color:white; background-color:blue";
        }
        cell.setAttribute("data-answer-area-index-num", i);
      } catch {
        console.log("caught");
        cell.innerText = "--";
      }

      //   if (box_index_to_write_select_letter_to === i) {
      //     cell.innerText = letter;
      //   }

      //   cell.style = "color:white; background-color:gray";
      cell.addEventListener("click", function (e) {
        this_ref.selectIndexOfAnswerBoxToWriteTo(e);
      });
      container.appendChild(cell).className = "grid-item gameBtns";
    }
  }

  makeRows(this_ref) {
    const container = document.getElementById("gcontainer");
    while (container.firstChild) {
      container.firstChild.remove();
    }
    container.style.setProperty("--grid-rows", 10);
    container.style.setProperty("--grid-cols", 10);
    var alphabet = "QWERTYUIOP ASDFGHJKL ZXCVBNM".split("");
    for (let i = 0; i < alphabet.length; i++) {
      let cell = document.createElement("button");
      cell.innerText = alphabet[i];
      if (alphabet[i] === " ") {
        cell.setAttribute("data-blank", "true");
        cell.disabled = true;
      }
      cell.setAttribute("data-letter", alphabet[i]);
      cell.style = "color:white; background-color:green";
      cell.addEventListener("click", function (e) {
        this_ref.selectLetterOnClick(e);
      });

      container.appendChild(cell).className = "grid-item gameBtns";
    }
  }

  checkSolution(e) {
    if (
      this.state.arrayOfLettersPicked.join("").toLowerCase() ===
      this.state.word.toLowerCase()
    ) {
      alert("PASSED");
    } else {
      alert("failed");
    }
  }

  // TODO: make stylesheet for all styles instead of inline styling
  render() {
    return (
      <Fragment>
        <div className="game-container-wrap">
          <div className="content">
            <Button style={{ margin: "10px" }} onClick={this.checkSolution}>
              Check Solution
            </Button>
            <div>Letters chosen: {this.state.arrayOfLettersPicked}</div>
            <div id="answer_box"></div>

            <div id="gcontainer"></div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default WordleGame;
