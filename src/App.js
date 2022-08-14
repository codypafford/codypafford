import logo from "./logo.svg";
import "./App.css";
import { HashRouter , Routes ,Route } from 'react-router-dom';
import Home from './components/Home';
import NavigationMenu from "./components/NavigationMenu";
import AboutMe from "./components/AboutMe";
import Game from "./components/Game";
import Test from "./components/Test";

function App() {
  return (
    <HashRouter>
      <NavigationMenu />
      <Routes>
      <Route path="/test" element={<Test />} />
      <Route path="/about-me" element={<AboutMe />} />
        <Route path="/clicker" element={<Game />} />
        <Route exact path="/" element={<Home />} /> 
      </Routes>
    </HashRouter>
  );
}

export default App;
