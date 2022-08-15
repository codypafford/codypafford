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
  }

  componentDidMount() {
    document.title = "Game";
    this.makeRows(this);
    this.makeAnswerArea(this, null, null);
  }

  hideGameRules() {
    this.setState({ showRules: false });
  }

  selectLetterOnClick(e) {
    var selectedLetter = e.target.getAttribute("data-letter");
    this.makeAnswerArea(this, this.state.answerBoxToWriteTo, selectedLetter);
    console.log("put in " + selectedLetter);
    this.setState({
      arrayOfLettersPicked: this.state.arrayOfLettersPicked.concat([
        selectedLetter,
      ]),
    });
    console.log(this.state.arrayOfLettersPicked);
    var i = this.state.answerBoxToWriteTo;
    this.setState({ answerBoxToWriteTo: i + 1 });
  }

  selectIndexOfAnswerBoxToWriteTo(e) {
    var i = e.target.getAttribute("data-answer-area-index-num");
    var arr = this.state.arrayOfLettersPicked;
    var arr = arr.splice(0, i);
    this.setState({ arrayOfLettersPicked: arr });
    this.setState({ answerBoxToWriteTo: i });
    // also need to remove all items from array after that specified index
  }

  makeAnswerArea(this_ref, box_index_to_write_select_letter_to, letter) {
    const container = document.getElementById("answer_box");
    while (container.firstChild) {
      container.firstChild.remove();
    }
    for (let i = 0; i < this.state.word.length; i++) {
      var lettersAlreadyPicked = this.state.arrayOfLettersPicked;
      let cell = document.createElement("button");
      try {
        cell.innerText = lettersAlreadyPicked[i];
        cell.setAttribute("data-answer-area-index-num", i);
      } catch {
        cell.innerText = "--";
      }

      if (box_index_to_write_select_letter_to === i) {
        cell.innerText = letter;
      }

      cell.style = "color:white; background-color:gray";
      if (i == this.state.answerBoxToWriteTo) {
        cell.style = "color:white; background-color:blue";
      }
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
      if (alphabet[i] === "") {
        cell.setAttribute("data-blank", "true");
      }
      cell.setAttribute("data-letter", alphabet[i]);
      cell.style = "color:white; background-color:green";
      cell.addEventListener("click", function (e) {
        this_ref.selectLetterOnClick(e);
      });
      container.appendChild(cell).className = "grid-item gameBtns";
    }
  }

  // TODO: make stylesheet for all styles instead of inline styling
  render() {
    return (
      <Fragment>
        <div className="game-container-wrap">
          <div className="content">
            <div id="answer_box"></div>
            <div id="gcontainer"></div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default WordleGame;
