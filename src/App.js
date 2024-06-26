import '../src/styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Header from './components/header';
import LeaderBoard from './leaderboard';
import Shop from './shop';
import Skins from './skins';
import Levels from './levels';
import Game from './levels/game';
import Settings from './settings';
import Achievements from './achievements';
import { AuthProvider } from '../src/AuthContext';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/leaderboard' element={<LeaderBoard />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/skins' element={<Skins />} />
            <Route path='/levels' element={<Levels />} />
            <Route path='/achievements' element={<Achievements />} />
            <Route path='/levels/Game' element={<Game />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
