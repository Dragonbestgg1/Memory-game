import '../src/styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Header from './components/header';
import LeaderBoard from './leaderboard';
import Shop from './shop';
import Skins from './skins';
import Levels from './levels';
import { AuthProvider } from '../src/AuthContext'; 

function App() {
  return (
    <div className="App">
      <AuthProvider>
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
      </AuthProvider>
    </div>
  );
}

export default App;
