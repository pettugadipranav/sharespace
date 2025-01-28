import './App.css';
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useState, useEffect } from "react";
import Editft from './components/Editft';
import Tp from './components/Tp';
import AS from './components/autosearch';

function App() {

  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<Editft/>}/>
      <Route path="/tp" element={<Tp/>}/>
      <Route path="/as" element={<AS/>}/>
      </Routes>
    </Router>
    </>
  );
}


export default App;