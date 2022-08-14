import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { SocialIcon } from "react-social-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import ReactAnimatedWeather from "react-animated-weather";

import resume from "../../src/resume/cody_pafford_resume.pdf";

const defaults = {
  icon: "CLEAR_DAY",
  color: "goldenrod",
  size: 50,
  animate: true,
};

const NavigationMenu = (props) => {
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <ReactAnimatedWeather
          icon={defaults.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
        <Navbar.Brand href="/" style={{ paddingLeft: "10px" }}>
          Cody Pafford
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#/about-me">About Me</Nav.Link>
            <Nav.Link href={resume} target="_blank">
              Download Resume
            </Nav.Link>
            <NavDropdown title="Games" id="basic-nav-dropdown">
              <NavDropdown.Item href="#/clicker" target="">
                <FontAwesomeIcon icon={faGamepad} /> &nbsp; Clicker Game
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Links" id="basic-nav-dropdown">
              <NavDropdown.Item
                href="https://www.linkedin.com/in/cody-pafford-123cp/"
                target="_blank"
              >
                <FontAwesomeIcon icon={faLinkedin} /> &nbsp; LinkedIn
              </NavDropdown.Item>
              <NavDropdown.Item
                href="https://github.com/codypafford"
                target="_blank"
              >
                <FontAwesomeIcon icon={faGithub} /> &nbsp; GitHub
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavigationMenu;
