import { Route, Routes} from 'react-router-dom';
import LandingPage from "./components/LandingPage";
import Home from './components/Home';
import CreateGame from "./components/CreateGame"
import About from "./components/About"
import Detail from "./components/Detail"
//import GamesNames from './components/GamesName';
import './App.css';

function App() {
  return (
      <div className="App">
        <Routes>
        <Route path= '/' element={<LandingPage/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path= '/createGame' element={<CreateGame/>}/>
        <Route path= '/detail/:id' element={<Detail/>}/>
        <Route path="/about" element={<About/>}/>
        </Routes>
    </div>
  );
}

export default App;