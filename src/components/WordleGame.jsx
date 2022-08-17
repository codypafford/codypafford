import React, { Component, Fragment } from "react";
import {
  Button,
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Row,
} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
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
      definition: "",
      answerBoxToWriteTo: 0,
      arrayOfLettersPicked: [],
      theGivens: [],
      attempts: 0,
      wordSize: 5,
      showRuleModal: false,
      modalHeaderText: "",
      modalBodyText: "",
    };

    this.hideGameRules = this.hideGameRules.bind(this);
    this.checkSolution = this.checkSolution.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
    this.startNew = this.startNew.bind(this);

    this.hideRuleModal = this.hideRuleModal.bind(this);
    this.showRuleModal = this.showRuleModal.bind(this);
    this.rulesModal = this.rulesModal.bind(this);

    this.hideModalForButtons = this.hideModalForButtons.bind(this);
    this.showModalForButtons = this.showModalForButtons.bind(this);
    this.myModal = this.myModal.bind(this);

    this.showHints = this.showHints.bind(this);
  }

  // make this simpler. use async/await
  async componentDidMount() {
    document.title = "Game";
    var this_ref = this;
    await this.getWord(this_ref);
    // this.getDefinition(this_ref);
  }

  async getWord(this_ref) {
    await axios
      .get(
        "https://random-word-api.herokuapp.com/word?length=" +
          this.state.wordSize
      )
      .then((response) => {
        this.getDefinition(this_ref, response.data[0]);
        console.log("-------------------getWord response-------------");
        console.log(response);
        console.log(response.data[0]);
        console.log("-------------------getWord response-------------");
        this_ref.setState({ word: response.data[0] }, () => {
          this_ref.makeKeyboard(this_ref);
          this_ref.makeAnswerArea(this_ref);
        });
      });
  }

  async getDefinition(this_ref, word) {
    await axios
      .get("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
      .then(function (response) {
        // handle success
        console.log(response);
        this_ref.setState({
          definition: response.data[0].meanings[0].definitions[0].definition,
        });
        console.log(
          "definition of " +
            this_ref.state.word +
            " is " +
            response.data[0].meanings[0].definitions[0].definition
        );
      })
      .catch((err) => {
        this_ref.setState({ definition: "" });
      });
    return;
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
        cell.innerText = "*";
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
      alert("YOU WERE CORRECT! CONGRATS, YOU WIN!");
    } else {
      alert("YOU WERE INCORRECT. TRY AGAIIN.");
    }
    var attempts = this.state.attempts;
    this.setState({ attempts: attempts + 1 });
    this.setTheGivens();
  }

  setTheGivens() {
    // For givens AND letters the user got correct
    // TODO: don't overwrite givens until onto the next word. Concat instead.
    var separator = "=";
    var the_answer = this.state.word.toLowerCase();
    var user_word = this.state.arrayOfLettersPicked.join("").toLowerCase();
    var givens_arr = [];
    for (var i = 0; i < the_answer.length; i++) {
      if (the_answer[i] === user_word[i]) {
        givens_arr.push(the_answer[i].toUpperCase() + separator + i);
      }
    }
    var x = this.state.theGivens;
    x = [...x, ...givens_arr];
    let givens = [...new Set(x)];
    givens.sort(function (a, b) {
      return parseInt(a.split(separator)[1]) - parseInt(b.split(separator)[1]);
    });
    this.setState({ theGivens: givens });
    this.setState({ answerBoxToWriteTo: 0 });
    this.setState({ arrayOfLettersPicked: [] });
  }

  maxLettersPicked() {
    if (this.state.arrayOfLettersPicked.length >= this.state.word.length) {
      return true;
    }
    return false;
  }

  showHints() {
    var word = this.state.word;
    let vowels_obj = { a: 0, e: 0, i: 0, o: 0, u: 0 };
    let vowels = "aeiou";
    let numOfVowelsFound = 0;

    for (var i = 0; i < word.length; i++) {
      let letter = word[i].toLowerCase();
      if (vowels.includes(letter)) {
        let count = vowels_obj[letter];
        vowels_obj[letter] = count + 1;
        numOfVowelsFound = numOfVowelsFound + 1;
      }
    }
    var hint_string = "";

    var hint1 =
      numOfVowelsFound <= 1
        ? "There is " + numOfVowelsFound + " vowel.\n"
        : "There are " + numOfVowelsFound + " vowels.\n";

    var hint2 = "";
    var vowelSeenTheMost;
    if (numOfVowelsFound > 0) {
      vowelSeenTheMost = Object.keys(vowels_obj).reduce((a, b) =>
        vowels_obj[a] > vowels_obj[b] ? a : b
      );
      hint2 =
        "Most seen vowel: " +
        vowelSeenTheMost.toUpperCase() +
        " is seen " +
        vowels_obj[vowelSeenTheMost] +
        " time(s).\n";
    }

    hint_string = hint1 + hint2;

    var body = hint_string;
    this.setModalInformation("Hints", body);
  }

  setModalInformation(heading, body) {
    this.setState({ modalHeaderText: heading }, () => {
      this.setState(
        {
          modalBodyText: body,
        },
        () => {
          this.showModalForButtons();
        }
      );
    });
  }

  showAnswer() {
    var body = "The Answer Is '" + this.state.word + "'.";
    this.setModalInformation("Information", body);
  }

  //   async startNewAsync() {

  //   }

  startNew() {
    // these need to all be inside a promise somehow ??
    this.setState({ word: "" });
    this.setState({ definition: "" });
    this.setState({ answerBoxToWriteTo: 0 });
    this.setState({ arrayOfLettersPicked: [] });
    this.setState({ theGivens: [] });
    this.setState({ showRules: false });
    this.setState({ attempts: 0 });
    this.setState({ showRuleModal: false });
    this.setState({ modalHeaderText: "" });
    this.setState({ modalBodyText: "" });

    var body = "A New Word Has Been Selected. Good Luck!";
    // this.setModalInformation("Information", body);
    this.componentDidMount();
  }

  // ---------------------------------------------
  showRuleModal() {
    this.setState({ showRuleModal: true });
  }
  hideRuleModal() {
    this.setState({ showRuleModal: false });
  }

  rulesModal(props) {
    return (
      <>
        <Button variant="primary" onClick={this.showRuleModal}>
          Rules
        </Button>

        <Modal show={this.state.showRuleModal} onHide={this.hideRuleModal}>
          <Modal.Header closeButton>
            <Modal.Title>{props.heading}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.body}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideRuleModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  //----------------------------------------------
  showModalForButtons() {
    this.setState({ showModal: true });
  }
  hideModalForButtons() {
    this.setState({ showModal: false });
  }

  myModal() {
    return (
      <>
        <Modal show={this.state.showModal} onHide={this.hideModalForButtons}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.modalHeaderText}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.modalBodyText}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideModalForButtons}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  // TODO: make stylesheet for all styles instead of inline styling
  render() {
    return (
      <Fragment>
        <div
          className="container game-container-wrap"
          style={isMobile ? { zoom: 0.8 } : { zoom: 1 }}
        >
          <div className="content">
            <div className="center-element-justified">
              <Button
                style={{
                  margin: "10px",
                  backgroundColor: "darkred",
                  color: "white",
                }}
                onClick={this.startNew}
              >
                New Word
              </Button>
              <Button style={{ margin: "10px" }} onClick={this.showHints}>
                Hints
              </Button>
              <Button
                style={{
                  margin: "10px",
                  backgroundColor: "darkred",
                  color: "white",
                }}
                onClick={this.showAnswer}
              >
                Show Answer
              </Button>
              <this.myModal></this.myModal>
              <this.rulesModal
                heading="Game Rules"
                body="Guess the word. You have unlimited attempts and can also ask for hints."
              ></this.rulesModal>
              <Button
                style={{ margin: "10px" }}
                onClick={this.checkSolution}
                disabled={!this.maxLettersPicked()}
              >
                Check Solution
              </Button>
            </div>
            <div>
              {" "}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  backgroundColor: "beige",
                }}
              >
                {this.state.arrayOfLettersPicked.length == 0
                  ? this.state.theGivens.map((given, idx) => {
                      return (
                        <div
                          key={idx}
                          style={{ color: "gray" }}
                          className="center-element-justified"
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
                            tag="div"
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
                          style={{ color: "gray" }}
                          className="center-element-justified"
                        >
                          {given}
                        </div>
                      );
                    })}
              </div>
            </div>
            <div className="center-element-justified">
              Letters chosen: {this.state.arrayOfLettersPicked}
            </div>
            <div id="answer_box" className="center-element-justified"></div>
            {this.state.definition != "" ? (
              <strong className="center-element-justified">
                Definition: {this.state.definition}
              </strong>
            ) : (
              <></>
            )}
            <div style={{ color: "green" }}>
              Attempts: {this.state.attempts}
            </div>
            <div id="gcontainer" className="center-element-justified"></div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default WordleGame;
