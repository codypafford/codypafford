import React, { Component, Fragment } from "react";

import LogoImage from "../images/bg_img.JPEG";
import AnimatedText from "react-animated-text-content";

var bgImage = {
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  overflow: "hidden",
  borderRadius: 150,
  borderWidth: 10,
};

var imgParent = {
  display: "flex",
  justifyContent: "center",
  overflow: "hidden",
  position: "relative",
};

var container = {
  textAlign: "center",
};

class Home extends Component {
  componentDidMount() {
    document.title = "Cody Pafford";
  }
  render() {
    return (
      <Fragment>
        <div style={container}>
          <AnimatedText
            type="words" // animate words or chars
            animation={{
              x: "200px",
              y: "-20px",
              scale: 1.1,
              ease: "ease-in-out",
            }}
            animationType="float"
            interval={0.06}
            duration={0.8}
            tag="p"
            className="animated-paragraph"
            includeWhiteSpaces
            threshold={0.1}
            rootMargin="20%"
          >
            Hi, I'm Cody Pafford. Welcome to my page!
          </AnimatedText>
        </div>
        <div style={imgParent} className="head-text">
          <img src={LogoImage} style={bgImage} />
        </div>
      </Fragment>
    );
  }
}
export default Home;
