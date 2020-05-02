import React, { Suspense } from 'react'
import NavBar from './components/views/Navbar/Navbar'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Auth from './hoc/auth'
import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from "./components/views/LoginPage/LoginPage"
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Footer from './components/views/Footer/Footer'
import { NotFound } from './components/views/Error/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={(<div>Loading...</div>)}>
        <NavBar />

        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route component={Auth(NotFound, false)} />
        </Switch>
        <Footer />
      </Suspense>
    </BrowserRouter>
    
  );
}

export default App;
