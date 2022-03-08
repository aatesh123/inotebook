import './App.css';
import React from "react";
import Navbar  from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
// import Alert from './components/Alert';
// this is for  Router-dom
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
//this is for using context-api
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';


function App  () {
  return (
    <>
      {/* notestate is for contextapi to avoid multile passing of props and states */}
      <NoteState>
        <Router>
          <Navbar />
          {/* <Alert message="app is working fine" /> */}
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
