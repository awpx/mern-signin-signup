import React from 'react'
import NavBar from './components/views/Navbar/Navbar'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Auth from './hoc/auth'
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from "./components/views/LoginPage/LoginPage.js"

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Switch>
        <Route exact path="/" component={Auth(LandingPage, null)} />
        <Route exact path="/login" component={Auth(LoginPage, false)} />
      </Switch>

    </BrowserRouter>
    
  );
}

export default App;
