import '../src/styles/App.css';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import Header from './components/header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
