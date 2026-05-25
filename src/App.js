import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {Home, Project, Contact} from './pages/index';
import Navbar from './components/Navbar';


function App() {
  return (
    <Router>
      <div className="bg-slate-300/20">
        <Navbar/>
        <Routes>
          <Route path ="/" element = {<Home />} />
          <Route path ="/projects" element = {<Project />} />
          <Route path ="/contactme" element = {<Contact />} />
          
        </Routes>
      </div>
    </Router>
  );
}


export default App;
