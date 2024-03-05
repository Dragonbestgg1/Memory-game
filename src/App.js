import '../src/styles/App.css';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import Header from './components/header';
import LeaderBoard from './leaderboard';
import Shop from './shop';
import Skins from './skins';
import Levels from './levels';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/leaderboard' element={<LeaderBoard />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/skins' element={<Skins />} />
          <Route path='/levels' element={<Levels />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
