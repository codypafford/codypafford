import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import Home from './components/Home';
import NavigationMenu from "./components/NavigationMenu";
import AboutMe from "./components/AboutMe";
import Game from "./components/Game";

function App() {
  return (
    <BrowserRouter>
    <NavigationMenu/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about-me' element={<AboutMe/>}/>
        <Route path='/clicker' element={<Game/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
