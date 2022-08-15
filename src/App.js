import logo from "./logo.svg";
import "./App.css";
import { HashRouter , Routes ,Route } from 'react-router-dom';
import Home from './components/Home';
import NavigationMenu from "./components/NavigationMenu";
import AboutMe from "./components/AboutMe";
import Game from "./components/Game";
import LoopyGame from "./components/LoopyGame";
import WordleGame from "./components/WordleGame";

function App() {
  return (
    <HashRouter>
      <NavigationMenu />
      <Routes>
      <Route path="/about-me" element={<AboutMe />} />
        <Route path="/clicker" element={<Game />} />
        <Route path="/loop-game" element={<LoopyGame />} />
        <Route path="/word-game1" element={<WordleGame />} />
        <Route exact path="/" element={<Home />} /> 
      </Routes>
    </HashRouter>
  );
}

export default App;
