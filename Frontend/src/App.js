import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import EnhancedTable from './components/EnhancedTable';
import React from 'react';
import { BrowserRouter as Router, Routes , Route} from "react-router-dom";
import Profile from './components/profile'
function App() {
  return (
    <div className="App">
      <Router>
      <React.Fragment>
      <Header />
      <Routes>
      <Route path="/" exact element={<EnhancedTable />}/>
      <Route path="/profile" element={<Profile />}/>
      </Routes>
      </React.Fragment>
    </Router>
    </div>
  );
}

export default App;
