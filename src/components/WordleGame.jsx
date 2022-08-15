import React, { Component, Fragment } from "react";
import {
  Button,
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Row,
} from "react-bootstrap";
import AnimatedText from "react-animated-text-content";

import GameRules from "./GameRules";
import { isMobile } from "react-device-detect";

const axios = require("axios").default;

// TODO: add number of attempts based on difficulty of word
// have hint button that subtracts an attempt or 2 and returns number of vowels or double letter (e.g. OO or LL)
// TODO: make the givens concat if still working on the same word but remove duplicates too

class WordleGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRules: true,
      word: "apple",
      answerBoxToWriteTo: 0,
      arrayOfLettersPicked: [],
      theGivens: [],
    };

    this.hideGameRules = this.hideGameRules.bind(this);
    this.checkSolution = this.checkSolution.bind(this);
  }

  componentDidMount() {
    document.title = "Game";

    var this_ref = this;
    // Make a request for a user with a given ID
    axios
      .get("https://random-word-api.herokuapp.com/word")
      .then(function (response) {
        // handle success
        console.log(response);
        this_ref.setState({ word: response.data[0] }, () => {
          this_ref.makeKeyboard(this_ref);
          this_ref.makeAnswerArea(this_ref);
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {});
  }

  hideGameRules() {
    this.setState({ showRules: false });
  }

  selectLetterOnClick(e) {
    if (this.maxLettersPicked()) {
      return;
    }
    var selectedLetter = e.target.getAttribute("data-letter");
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
          cell.innerText = i;
          cell.style = "color:white; background-color:blue";
        }
        cell.setAttribute("data-answer-area-index-num", i);
      } catch {
        cell.innerText = "--";
      }
      cell.addEventListener("click", function (e) {
        this_ref.selectIndexOfAnswerBoxToWriteTo(e);
      });
      container.appendChild(cell).className = "grid-item gameBtns";
    }
  }

  makeKeyboard(this_ref) {
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
    this.setTheGivens();
  }

  setTheGivens() {
    // For givens AND letters the user got correct
    // TODO: don't overwrite givens until onto the next word. Concat instead.
    var the_answer = this.state.word.toLowerCase();
    var user_word = this.state.arrayOfLettersPicked.join("").toLowerCase();
    var givens_obj = [];
    for (var i = 0; i < the_answer.length; i++) {
      if (the_answer[i] === user_word[i]) {
        givens_obj.push(the_answer[i] + "-" + i);
      }
    }
    console.log("the givens: ");
    console.log(givens_obj);
    this.setState({ theGivens: givens_obj });
    this.setState({ answerBoxToWriteTo: 0 });
    this.setState({ arrayOfLettersPicked: [] });
  }

  maxLettersPicked() {
    if (this.state.arrayOfLettersPicked.length >= this.state.word.length) {
      return true;
    }
    return false;
  }

  // TODO: make stylesheet for all styles instead of inline styling
  render() {
    return (
      <Fragment>
        <div className="game-container-wrap">
          <div className="content">
            <Button
              style={{ margin: "10px" }}
              onClick={this.checkSolution}
              disabled={!this.maxLettersPicked()}
            >
              Check Solution
            </Button>
            <div>
              {" "}
              {this.state.arrayOfLettersPicked.length == 0
                ? this.state.theGivens.map((given, idx) => {
                    return (
                      <div
                        key={idx}
                        style={{ textAlign: "center", color: "gray" }}
                      >
                        <AnimatedText
                          type="words" // animate words or chars
                          animation={{
                            x: "600px",
                            y: "-200px",
                            scale: 1.1,
                            ease: "ease-in-out",
                          }}
                          animationType="wave"
                          interval={0.06}
                          duration={1.2}
                          tag="p"
                          className="animated-paragraph"
                          includeWhiteSpaces
                          threshold={0.1}
                          rootMargin="20%"
                        >
                          {given}
                        </AnimatedText>
                      </div>
                    );
                  })
                : this.state.theGivens.map((given, idx) => {
                    return (
                      <div
                        key={idx}
                        style={{ textAlign: "center", color: "gray" }}
                      >
                        {given}
                      </div>
                    );
                  })}
            </div>
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
