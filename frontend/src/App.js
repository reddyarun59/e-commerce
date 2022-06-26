import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Register/>}/>
          <Route path="/signin" element={<Login/>}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
