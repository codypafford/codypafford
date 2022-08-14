import React, { Component, Fragment } from "react";
import MyGallery from "./MyGallery";
import {
  Button,
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Row,
} from "react-bootstrap";
import AnimatedText from "react-animated-text-content";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

let Data = require("../data/data.json");

var listItem = {
  margin: 20,
};

class AboutMe extends Component {
  componentDidMount() {
    document.title = "Cody Pafford";
  }
  render() {
    return (
      <Fragment>
        <Container>
          <h4 style={{ color: "goldenrod" }}>
            {" "}
            <AnimatedText
              type="words" // animate words or chars
              animation={{
                x: "600px",
                y: "-200px",
                scale: 1.1,
                ease: "ease-in-out",
              }}
              animationType="float"
              interval={0.06}
              duration={0.8}
              tag="p"
              className="animated-paragraph centerAlignText"
              includeWhiteSpaces
              threshold={0.1}
              rootMargin="20%"
            >
              My name is Cody Pafford
            </AnimatedText>
          </h4>
          <p className="centerAlignText">
            I am currently a software engineer with experience in a variety of
            different technologies, including but not limited to:
            <br />
            <br />
            <Container style={{ backgroundColor: "#f8f8f8" }}>
              <ul
                style={{
                  columnCount: "2",
                  listStyleType: "none",
                }}
              >
                {Data.experience.map((exp, idx) => {
                  return (
                    <li
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
                        {exp}
                      </AnimatedText>
                    </li>
                  );
                })}
              </ul>
            </Container>
            <br />
            <br /> I also am an Amazon Web Services <b>certified</b> Cloud
            Practitioner.
          </p>

          <h5>
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
              duration={0.5}
              tag="p"
              className="animated-paragraph centerAlignText"
              includeWhiteSpaces
              threshold={0.1}
              rootMargin="20%"
            >
              Aside from software development, I love adventures and have a
              passion for being outdoors. Hiking, kayaking, traveling, you name
              it. I am also an aquarium enthusiast.
            </AnimatedText>
          </h5>
          <p className="centerAlignText">
            Get to know me a little better by viewing my gallery of the above
            mentioned hobbies.
          </p>
          <MyGallery />
        </Container>
      </Fragment>
    );
  }
}
export default AboutMe;
