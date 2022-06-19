import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header";
import EnhancedTable from "./components/EnhancedTable";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import SendFile from "./components/sendFile";
import DownloadFile from "./components/downloadFile";

function App() {
  return (
    <div className="App">
      <Router>
        <React.Fragment>
          <Header />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/list" exact element={<EnhancedTable />} />
            <Route path="/send" exact element={<SendFile />} />
            <Route path="/download" exact element={<DownloadFile />} />
          </Routes>
        </React.Fragment>
      </Router>
    </div>
  );
}

export default App;
